import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Target, 
  Users, 
  Award, 
  BookOpen, 
  Lightbulb, 
  Heart, 
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react';
import './AboutUs.css';

function AboutUs() {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({
    students: 0,
    careers: 0,
    success: 0,
    partners: 0
  });

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const targets = {
        students: 10000,
        careers: 500,
        success: 95,
        partners: 50
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          students: Math.floor(targets.students * progress),
          careers: Math.floor(targets.careers * progress),
          success: Math.floor(targets.success * progress),
          partners: Math.floor(targets.partners * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const statsElement = document.querySelector('.stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze your skills, interests, and market trends to provide personalized career recommendations."
    },
    {
      icon: Target,
      title: "Precision Roadmaps",
      description: "Detailed, step-by-step learning paths tailored to your career goals, from beginner to industry expert."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Resources",
      description: "Access to curated learning materials, industry insights, and skill assessment tools all in one platform."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a thriving community of learners, mentors, and industry professionals on similar career journeys."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      description: "Former Google engineer with 10+ years in AI and education technology.",
      image: "👨‍💼"
    },
    {
      name: "Priya Sharma",
      role: "Head of AI",
      description: "PhD in Machine Learning, specializing in career prediction algorithms.",
      image: "👩‍💻"
    },
    {
      name: "Arjun Singh",
      role: "Product Manager",
      description: "Ex-Microsoft PM with expertise in user experience and product strategy.",
      image: "👨‍💻"
    },
    {
      name: "Sneha Patel",
      role: "Head of Content",
      description: "Career counselor and content strategist with 8+ years experience.",
      image: "👩‍🎓"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make puts student success and well-being first."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge career guidance solutions."
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We provide honest, transparent, and ethical career guidance to all students."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making quality career guidance accessible to students from all backgrounds."
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Best EdTech Startup 2024",
      description: "Recognized by TechCrunch India"
    },
    {
      icon: TrendingUp,
      title: "95% Success Rate",
      description: "Students finding relevant career paths"
    },
    {
      icon: Star,
      title: "4.9/5 Rating",
      description: "Average user satisfaction score"
    },
    {
      icon: Users,
      title: "10K+ Students",
      description: "Guided to successful careers"
    }
  ];

  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Empowering <span className="gradient-text">Career Dreams</span> with AI
            </h1>
            <p className="hero-description">
              Career Sarthi is India's leading AI-powered career guidance platform, 
              helping students discover their true potential and navigate their path 
              to professional success.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Students Guided</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Career Paths</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <Bot className="card-icon" />
              <span>AI-Powered Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Tabs */}
      <section className="tabs-section">
        <div className="container">
          <div className="tabs-header">
            <button 
              className={`tab-button ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              Our Mission
            </button>
            <button 
              className={`tab-button ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              Our Vision
            </button>
            <button 
              className={`tab-button ${activeTab === 'story' ? 'active' : ''}`}
              onClick={() => setActiveTab('story')}
            >
              Our Story
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'mission' && (
              <div className="tab-panel">
                <h2>Democratizing Career Guidance</h2>
                <p>
                  Our mission is to democratize access to quality career guidance by leveraging 
                  artificial intelligence to provide personalized, data-driven career recommendations 
                  to every student, regardless of their background or location.
                </p>
                <ul className="mission-points">
                  <li><CheckCircle className="check-icon" /> Make career guidance accessible to all</li>
                  <li><CheckCircle className="check-icon" /> Provide data-driven insights</li>
                  <li><CheckCircle className="check-icon" /> Bridge the skills gap in industry</li>
                  <li><CheckCircle className="check-icon" /> Empower informed career decisions</li>
                </ul>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="tab-panel">
                <h2>Shaping the Future of Careers</h2>
                <p>
                  We envision a world where every student has access to personalized career guidance, 
                  where career decisions are made with confidence backed by data, and where the gap 
                  between education and industry requirements is eliminated.
                </p>
                <div className="vision-goals">
                  <div className="goal-item">
                    <Globe className="goal-icon" />
                    <h3>Global Reach</h3>
                    <p>Expanding to serve students worldwide</p>
                  </div>
                  <div className="goal-item">
                    <Zap className="goal-icon" />
                    <h3>AI Innovation</h3>
                    <p>Leading in AI-powered career solutions</p>
                  </div>
                  <div className="goal-item">
                    <Users className="goal-icon" />
                    <h3>Community Building</h3>
                    <p>Creating a global career guidance ecosystem</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="tab-panel">
                <h2>From Idea to Impact</h2>
                <p>
                  Career Sarthi was born from a simple observation: talented students often struggle 
                  with career decisions due to lack of proper guidance. Our founders, having experienced 
                  this challenge themselves, decided to build a solution that combines the power of AI 
                  with human expertise.
                </p>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-year">2022</div>
                    <div className="timeline-content">
                      <h4>The Beginning</h4>
                      <p>Founded by IIT graduates with a vision to transform career guidance</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-year">2023</div>
                    <div className="timeline-content">
                      <h4>AI Development</h4>
                      <p>Launched our proprietary AI algorithm for career matching</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-year">2024</div>
                    <div className="timeline-content">
                      <h4>Scale & Impact</h4>
                      <p>Reached 10,000+ students and expanded across India</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">What Makes Us Different</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact in Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{counters.students.toLocaleString()}+</div>
              <div className="stat-label">Students Guided</div>
              <div className="stat-description">Across 50+ cities in India</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counters.careers}+</div>
              <div className="stat-label">Career Paths</div>
              <div className="stat-description">In our comprehensive database</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counters.success}%</div>
              <div className="stat-label">Success Rate</div>
              <div className="stat-description">Students find relevant careers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counters.partners}+</div>
              <div className="stat-label">Industry Partners</div>
              <div className="stat-description">Leading companies and institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.image}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <value.icon className="value-icon" />
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <h2 className="section-title">Recognition & Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <achievement.icon className="achievement-icon" />
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Career Journey?</h2>
            <p className="cta-description">
              Join thousands of students who have discovered their dream careers with Career Sarthi
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">
                Get Started Now
                <ArrowRight className="btn-icon" />
              </button>
              <button className="btn btn-secondary">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;