import React from 'react'
import './Footer.css'
import { Bot } from 'lucide-react';
const Footer = () => {
  return (
       
        <div className="footer-container">
          <div className="footer-logo">
            <Bot className="logo-icon" />
            <span className="logo-text">
              Career Sarthi
            </span>
          </div>
          <p className="footer-description">
            Empowering students with AI-driven career guidance and personalized learning paths.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
    
  )
}

export default Footer
