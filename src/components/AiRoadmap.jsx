// src/components/AiRoadmap.jsx
import React, { useState, useRef } from "react";

export default function AiRoadmap() {
    const [fileName, setFileName] = useState(null);
    const [parsing, setParsing] = useState(false);
    const [parsedResume, setParsedResume] = useState(null);
    const [roadmapResult, setRoadmapResult] = useState(null);
    const [error, setError] = useState(null);
    const [generating, setGenerating] = useState(false);
    const fileRef = useRef();

    const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    async function uploadAndParse(e) {
        setError(null);
        setParsedResume(null);
        setRoadmapResult(null);

        const file = e?.target?.files ? e.target.files[0] : fileRef.current.files[0];
        if (!file) return;
        setFileName(file.name);
        setParsing(true);

        try {
            const form = new FormData();
            form.append("file", file);

            console.log("Uploading file to:", `${BACKEND}/api/parse-resume`);
            const res = await fetch(`${BACKEND}/api/parse-resume`, {
                method: "POST",
                body: form,
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Parse API error ${res.status}: ${text}`);
            }

            const data = await res.json();
            if (!data?.success) throw new Error("Parsing failed.");

            setParsedResume(data.parsed);
        } catch (err) {
            setError(err.message || "Error parsing resume");
        } finally {
            setParsing(false);
        }
    }

    async function generateRoadmap() {
        setError(null);
        setRoadmapResult(null);
        if (!parsedResume) return setError("Upload/parse a resume first.");

        setGenerating(true);
        try {
            const res = await fetch(`${BACKEND}/api/generate-roadmap`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ parsedResume }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Generate API error ${res.status}: ${text}`);
            }

            const data = await res.json();
            if (!data?.success) throw new Error("Roadmap generation failed");

            setRoadmapResult(data);
        } catch (err) {
            setError(err.message || "Error generating roadmap");
        } finally {
            setGenerating(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Resume → Personalized Roadmap</h2>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Upload resume (PDF / DOCX / TXT)</label>
                <input ref={fileRef} type="file" accept=".pdf,.txt,.docx" onChange={uploadAndParse} />
                <div className="mt-2 text-sm text-gray-600">File: {fileName || "none"}</div>
            </div>

            {parsing && <div className="mb-2 text-blue-600">Parsing resume…</div>}
            {error && <div className="mb-2 text-red-600"><strong>Error:</strong> {error}</div>}

            {parsedResume && (
                <div className="mb-4 bg-white p-4 rounded shadow overflow-auto">
                    <h3 className="font-semibold">Parsed Resume (preview)</h3>
                    <pre className="mt-2 max-h-64 overflow-auto text-xs">{JSON.stringify(parsedResume, null, 2)}</pre>
                </div>
            )}

            <div className="flex gap-3">
                <button
                    onClick={generateRoadmap}
                    disabled={!parsedResume || generating}
                    className={`px-4 py-2 rounded ${parsedResume && !generating ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"}`}
                >
                    {generating ? "Generating…" : "Generate Personalized Roadmap"}
                </button>
            </div>

            {roadmapResult && (
                <div className="mt-6 bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">AI Result</h3>

                    {roadmapResult.modelJson ? (
                        <div className="text-sm space-y-4">
                            {/* Updated Resume */}
                            <div>
                                <h4 className="font-semibold">📄 Updated Resume</h4>
                                <pre className="mt-2 bg-gray-100 p-2 rounded text-xs max-h-48 overflow-auto">
                                    {JSON.stringify(roadmapResult.modelJson.updated_resume, null, 2)}
                                </pre>
                            </div>

                            {/* Improvements */}
                            <div>
                                <h4 className="font-semibold">✨ Improvements</h4>
                                <ul className="list-disc ml-6">
                                    {(roadmapResult.modelJson.improvements || []).map((imp, i) => (
                                        <li key={i}>{imp}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Roadmap */}
                            <div>
                                <h4 className="font-semibold">🚀 12-Week Roadmap</h4>
                                <ul className="list-decimal ml-6">
                                    {Object.entries(roadmapResult.modelJson.roadmap || {}).map(([week, task]) => (
                                        <li key={week} className="mb-1">
                                            <strong>{week}:</strong> {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-600">
                            Model did not return clean JSON. Inspect raw output below.
                            <pre className="mt-2 max-h-48 overflow-auto text-xs">{roadmapResult.modelRaw}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


