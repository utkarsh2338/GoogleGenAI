import React, { useState } from "react";
import AiRoadmap from "./AIRoadmap.jsx";
export default function AiTool() {
    // adjust headerHeight if your top navbar has a different height
    const headerHeight = 64;
    const [selectedFile, setSelectedFile] = useState(null);

    const outerStyle = {
        minHeight: `calc(100vh - ${headerHeight}px)`,
        paddingTop: `${headerHeight}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // new background color as requested
        backgroundColor: "#441e6d",
        width: "100%",
        boxSizing: "border-box"
    };

    const cardStyle = {
        width: "100%",
        maxWidth: 520,
        padding: 24,
        textAlign: "center",
        background: "transparent",
        color: "white" // ensure text is readable on dark background
    };

    const inputStyle = {
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "12px",
        borderRadius: 8,
        marginBottom: 16,
        width: "100%",
        boxSizing: "border-box",
        textAlign: "center",
        background: "white",
        color: "#111"
    };

    const buttonStyle = {
        backgroundColor: "#7c3aed",
        color: "white",
        padding: "10px 18px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer"
    };

    function handleFileChange(e) {
        const f = e.target.files && e.target.files[0];
        setSelectedFile(f || null);
        console.log("Selected file:", f);
    }

    function handleParseClick() {
        if (!selectedFile) {
            alert("Please choose a resume file first.");
            return;
        }

        // Example: read file and log contents (adjust as needed for real parsing/upload)
        const reader = new FileReader();
        reader.onload = () => {
            console.log("File read successful. Size:", selectedFile.size);
            // send reader.result to your parsing API or process locally
            alert("Resume parsing started. Check console for file info.");
        };
        reader.onerror = () => {
            console.error("Error reading file:", reader.error);
            alert("Failed to read the file.");
        };

        // For binary files like PDF use readAsArrayBuffer, text for plain text
        if (selectedFile.type === "application/pdf") {
            reader.readAsArrayBuffer(selectedFile);
        } else {
            reader.readAsText(selectedFile);
        }
    }

return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* Optional header area / title */}
        <div style={{ padding: 28, background: "#441e6d", color: "white", textAlign: "center" }}>
            <h1 style={{ fontSize: 28, margin: 0 }}>🚀 AI Career Assistant</h1>
            <p style={{ marginTop: 8 }}>Upload your resume and get a personalized roadmap.</p>
        </div>

        {/* The real tool */}
        <div style={{ padding: 20 }}>
            <AiRoadmap />
        </div>
    </div>
);
}




    

