import React from 'react'
import { Brain, Upload, Target, Users, Star, BookOpen } from 'lucide-react';

import './Features.css';
const Features = () => {
     const features = [
    {
      icon: Brain,
      title: "AI-Powered Guidance",
      description: "Get personalized career recommendations based on your skills, interests, and market trends"
    },
    {
      icon: Target,
      title: "Zero to Hero Roadmaps",
      description: "Complete learning paths from beginner to expert in your chosen field"
    },
    {
      icon: Upload,
      title: "Smart Resume Analysis",
      description: "AI-powered resume review with actionable feedback and optimization tips"
    },
    {
      icon: BookOpen,
      title: "Interactive Quizzes",
      description: "Discover your strengths and career aptitude through engaging assessments"
    }
  ];
  return (
    <div>
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">
            Powerful Features
          </h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <feature.icon className="feature-icon" />
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
