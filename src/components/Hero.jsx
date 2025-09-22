import React, { useState, useEffect } from 'react';
import { ChevronRight, Brain, Upload, Target, Users, Star, ArrowRight, Bot, BookOpen, Trophy, Zap } from 'lucide-react';
import './Hero.css';
import ResumeUpload from './ResumeUpload';
import { useNavigate } from "react-router-dom";


export default function CareerSarthiLanding({ onProtectedAction }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate(); // added: initialize navigate

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const roadmapSteps = [
    { step: "01", title: "Take Assessment", desc: "Complete our comprehensive career quiz" },
    { step: "02", title: "AI Analysis", desc: "Our AI analyzes your profile and market data" },
    { step: "03", title: "Get Roadmap", desc: "Receive your personalized learning path" },
    { step: "04", title: "Start Journey", desc: "Begin your zero-to-hero transformation" }
  ];

  return (
    <div className="career-sarthi-container">
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>


      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h2 className="hero-title">
            Your AI-Powered Career Guide
          </h2>

          <p className="hero-description">
            Unlock your potential with AI-powered career guidance. Get personalized roadmaps,
            skill assessments, and expert recommendations to transform your career journey.
          </p>

          <div className="hero-icon">
            <Brain className="brain-icon" />
          </div>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => onProtectedAction(() => {/* roadmap logic */ })}>
              Zero to Hero Roadmap
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onProtectedAction(() => navigate("/ai-tool"))}
            >
              Start Your Journey <ArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>



      {/* Roadmap Section */}
      <section className="roadmap-section">
        <div className="roadmap-container">
          <h2 className="section-title">
            Your Success Roadmap
          </h2>

          <div className="roadmap-grid">
            {roadmapSteps.map((item, index) => (
              <div key={index} className="roadmap-step">
                <div className="roadmap-card">
                  <div className="step-number">{item.step}</div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-description">{item.desc}</p>
                </div>
                {index < roadmapSteps.length - 1 && (
                  <ChevronRight className="step-arrow" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Sections */}
      <ResumeUpload onProtectedAction={onProtectedAction} />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Transform Your Career?
          </h2>
          <p className="cta-description">
            Join thousands of students who have already discovered their dream careers with Career Sarthi
          </p>
          <button className="btn btn-cta">
            Get Started Today
          </button>
        </div>
      </section>

    </div>
  );
}