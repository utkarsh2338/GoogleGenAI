// backend/server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const cors = require("cors");
const axios = require("axios");

const upload = multer({ dest: "uploads/" });
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ---------- Simple local resume parser ----------
function simpleResumeParser(text) {
  const cleaned = text.replace(/\r/g, "").replace(/\t/g, " ").trim();

  const emailMatch = cleaned.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : null;

  const phoneMatch = cleaned.match(/(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{6,12}/);
  const phone = phoneMatch ? phoneMatch[0] : null;

  const lines = cleaned.split("\n").map(l => l.trim()).filter(Boolean);
  const name = lines.length ? lines[0].split("|")[0].split(",")[0] : null;

  let skills = [];
  const skillsMatch = cleaned.match(/(skills|technical skills|technologies)[:\-\n]+([\s\S]{0,400})/i);
  if (skillsMatch) {
    const raw = skillsMatch[2].split(/\n/).slice(0, 6).join(" ");
    skills = raw.split(/[,•\u2022|;]+/).map(s => s.trim()).filter(Boolean);
  } else {
    const possible = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "React", "Node", "MongoDB", "SQL", "Docker", "AWS", "GCP", "Linux", "HTML", "CSS"];
    skills = possible.filter(k => cleaned.toLowerCase().includes(k.toLowerCase()));
  }

  let experience = [];
  const expMatch = cleaned.match(/(experience|work experience|professional experience)[:\-\n]+([\s\S]{0,800})/i);
  if (expMatch) {
    const expBlock = expMatch[2].split("\n\n")[0];
    experience = expBlock.split("\n").map(s => s.trim()).filter(Boolean).slice(0, 10);
  }

  return {
    name,
    email,
    phone,
    skills,
    experience,
    raw_text_snippet: lines.slice(0, 20).join("\n")
  };
}

// ---------- File extraction ----------
async function extractTextFromFile(filePath, mimeType, originalName) {
  const ext = path.extname(originalName).toLowerCase();
  if (ext === ".pdf") {
    const data = fs.readFileSync(filePath);
    const pdf = await pdfParse(data);
    return pdf.text;
  } else if (ext === ".docx" || mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else {
    try {
      return fs.readFileSync(filePath, "utf8");
    } catch {
      return "";
    }
  }
}

// ---------- Parse Resume ----------
app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });

    const filePath = req.file.path;
    const text = await extractTextFromFile(filePath, req.file.mimetype, req.file.originalname);

    fs.unlink(filePath, err => {
      if (err) console.error("File cleanup failed:", err);
    });

    if (!text || text.trim().length < 10) {
      return res.status(400).json({ success: false, error: "Could not extract text from file" });
    }

    const parsed = simpleResumeParser(text);
    return res.json({ success: true, parsed, raw_text_preview: text.slice(0, 500) });
  } catch (err) {
    console.error("Parse error:", err);
    return res.status(500).json({ success: false, error: err.message || "Parse error" });
  }
});

// ---------- Roadmap Generation ----------
const GOOGLE_KEY = process.env.GOOGLE_API_KEY;
const MODEL_NAME = process.env.GOOGLE_MODEL_NAME || "gemini-2.0-flash"; // ✅ use latest

async function callGeminiAPI(prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GOOGLE_KEY}`;
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1500
    }
  };

  const response = await axios.post(endpoint, body, { headers: { "Content-Type": "application/json" }, timeout: 120000 });
  let text = response.data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n") || "";

  // Remove markdown if wrapped
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return text;
}

app.post("/api/generate-roadmap", async (req, res) => {
  try {
    const { parsedResume } = req.body;
    if (!parsedResume) return res.status(400).json({ success: false, error: "parsedResume required" });
    if (!GOOGLE_KEY) return res.status(500).json({ success: false, error: "GOOGLE_API_KEY not configured on server" });

    const prompt = `You are an expert career mentor and resume editor. The user provided a resume JSON object. 
1) Produce a better formatted 'updated_resume' JSON (keep keys like name, contacts, summary, skills, experience but improve wording). 
2) Produce a short 'improvements' array with bullet suggestions. 
3) Produce a personalised 12-week 'roadmap' object mapping week numbers to tasks.
Return ONLY valid JSON with keys: updated_resume, improvements, roadmap.
Resume JSON:
${JSON.stringify(parsedResume)}`;

    const modelText = await callGeminiAPI(prompt);

    let parsed;
    try {
      parsed = JSON.parse(modelText);
    } catch (e) {
      console.error("JSON parse failed, raw:", modelText);
      return res.status(500).json({ success: false, error: "Invalid JSON from model", raw: modelText });
    }

    return res.json({ success: true, modelJson: parsed });
  } catch (err) {
    console.error("Error generating roadmap:", err?.response?.data || err.message);
    return res.status(500).json({ success: false, error: "Roadmap generation failed", details: err?.response?.data || err.message });
  }
});

// ---------- Health ----------
app.get("/", (req, res) => res.send("Backend OK"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));
