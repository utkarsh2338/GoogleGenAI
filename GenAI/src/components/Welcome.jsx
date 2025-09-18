import React, { useState, useEffect } from "react";
import {
    BookOpen,
    PenTool,
    Monitor,
    GraduationCap,
    Briefcase,
    Globe,
    Lightbulb,
    Calculator,
    Trash2,
    Brain,
    Target,
    Rocket,
    Star
} from "lucide-react";
import "./Welcome.css"; // CSS file for styling

const floatingIcons = [
    { id: 1, comp: BookOpen, class: "book" },
    { id: 2, comp: PenTool, class: "pen" },
    { id: 3, comp: Monitor, class: "pc" },
    { id: 4, comp: GraduationCap, class: "grad" },
    { id: 5, comp: Briefcase, class: "brief" },
    { id: 6, comp: Globe, class: "globe" },
    { id: 7, comp: Lightbulb, class: "idea" },
    { id: 8, comp: Calculator, class: "calc" },
    { id: 9, comp: Target, class: "target" },
    { id: 10, comp: Rocket, class: "rocket" },
    { id: 11, comp: Star, class: "star1" },
    { id: 12, comp: Star, class: "star2" }
];

const InteractiveParticle = ({ x, y, delay }) => (
    <div
        className="particle"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${delay}s`
        }}
    />
);

const Welcome = ({ onScroll, onProtectedAction }) => {
    const [particles, setParticles] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3
        }));
        setParticles(newParticles);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    return (
        <div className="welcome-container" onMouseMove={handleMouseMove}
        >
            {/* Particles */}
            {particles.map((particle) => (
                <InteractiveParticle
                    key={particle.id}
                    x={particle.x}
                    y={particle.y}
                    delay={particle.delay}
                />
            ))}

            {/* Mouse follower */}
            <div
                className="mouse-follower"
                style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`
                }}
            />

            {/* Floating icons */}
            <div className="icons-wrapper">
                {floatingIcons.map((icon) => {
                    const IconComponent = icon.comp;
                    return (
                        <div key={icon.id} className={`icon ${icon.class}`}>
                            <IconComponent size={45} strokeWidth={1.5} />
                        </div>
                    );
                })}
            </div>

            {/* ZERO Section - Top Left */}
            <div className="zero-section">
                <Trash2 size={70} className="zero-icon" strokeWidth={2.5} />
                <h1>ZERO</h1>
                <div className="underline"></div>
            </div>

            {/* HERO Section - Bottom Right */}
            <div className="hero-s">
                <Brain size={80} className="hero-i" strokeWidth={2} />
                <h1>HERO</h1>
                <div className="underline"></div>
            </div>
            {/* Curved Arrow ZERO → HERO */}
            <svg className="arrow-line">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="24"
                        markerHeight="24"
                        refX="0"
                        refY="6"
                        orient="auto"
                    >
                        <polygon points="0 0, 12 6, 0 12" fill="white" />
                    </marker>
                </defs>

                {/* Quadratic Bezier curve (curved path) */}
                <path
                    d="M 230 200 Q 600 50, 1150 650"
                    stroke="white"
                    strokeWidth="5"
                    fill="transparent"
                    markerEnd="url(#arrowhead)"
                    strokeDasharray="10"
                />
            </svg>


            <div className="cta-box">
                <h2>AI DRIVEN ROADMAP</h2>
                <button onWheel={onScroll} onTouchMove={onScroll} onClick={onScroll}>Discover Your Path</button>
                <p>
                    Your trusted guide to navigate and accelerate your professional
                    journey. <br />
                    Discover opportunities, build skills, and achieve your career goals.
                </p>
            </div >
        </div >
    );
};

export default Welcome;
