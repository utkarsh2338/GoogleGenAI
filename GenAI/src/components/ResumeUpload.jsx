import React from 'react'
import { Upload, ArrowRight, Trophy, Zap } from 'lucide-react';
import './ResumeUpload.css';

const ResumeUpload = () => {
    return (
        <div>
            <section className="interactive-section">
                <div className="interactive-container">
                    {/* Quiz Section */}
                    <div id="quiz" className="quiz-section">
                        <div className="section-header">
                            <Trophy className="section-icon" />
                            <h3 className="section-subtitle">Career Assessment Quiz</h3>
                        </div>
                        <p className="section-text">
                            Discover your ideal career path through our comprehensive AI-powered assessment.
                            Get insights into your strengths, interests, and potential career matches.
                        </p>
                        <button className="btn btn-quiz">
                            Take Quiz Now
                            <Zap className="btn-special-icon" />
                        </button>
                    </div>

                    {/* Resume Upload Section */}
                    <div id="upload" className="upload-section">
                        <div className="section-header">
                            <Upload className="section-icon" />
                            <h3 className="section-subtitle">Resume Analysis</h3>
                        </div>
                        <p className="section-text">
                            Upload your resume and get instant AI-powered feedback. Optimize your resume
                            with personalized suggestions and industry best practices.
                        </p>
                        <div className="upload-zone">
                            <Upload className="upload-icon" />
                            <p className="upload-text">Drop your resume here or click to browse</p>
                        </div>
                        <button className="btn btn-upload">
                            Analyze Resume
                            <ArrowRight className="btn-icon" />
                        </button>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default ResumeUpload
