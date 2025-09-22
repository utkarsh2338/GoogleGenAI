import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bot, Menu, X, User, ChevronDown } from 'lucide-react';
import { useUser, UserButton } from '@clerk/clerk-react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedNav, setClickedNav] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const scrollToHomeSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  useEffect(() => {
    if (clickedNav) {
      document.title = clickedNav;
    }
  }, [clickedNav]);

  useEffect(() => {
    const handleHashLink = () => {
      const sectionId = window.location.hash.substring(1);
      if (sectionId) {
        setTimeout(() => {
          scrollToHomeSection(sectionId);
        }, 100);
      }
    };
    handleHashLink();
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar')) {
        setIsOpen(false);
        setUserDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleNavClick = (navName) => {
    setClickedNav(navName);
    setIsOpen(false);
    setUserDropdown(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <NavLink 
            to="/" 
            className="logo-link"
            onClick={() => handleNavClick('Career Sarthi')}
          >
            <Bot className="logo-icon" />
            <span className="logo-text">Career Sarthi</span>
          </NavLink>
        </div>

        {/* Hamburger Menu */}
        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <div className={`nav-links ${isOpen ? 'active' : ''}`}> 
          <NavLink
            to="/home"
            className={({ isActive }) => `nav-item ${isActive ? 'active-link' : ''}`}
            onClick={() => handleNavClick('Home')}
          >
            <span className="nav-text">Home</span>
            <span className="nav-underline"></span>
          </NavLink>

          <NavLink
            to="/internship"
            className={({ isActive }) => `nav-item ${isActive ? 'active-link' : ''}`}
            onClick={() => handleNavClick('Internship')}
          >
            <span className="nav-text">Internships</span>
            <span className="nav-underline"></span>
          </NavLink>

          <button
            className="nav-item nav-dropdown-btn"
            onClick={() => scrollToHomeSection('quiz')}
          >
            <span className="nav-text">Take Quiz</span>
            <span className="nav-underline"></span>
          </button>

          <button
            className="nav-item nav-dropdown-btn"
            onClick={() => scrollToHomeSection('upload')}
          >
            <span className="nav-text">Resume Check</span>
            <span className="nav-underline"></span>
          </button>

          <NavLink
            to="/AboutUs"
            className={({ isActive }) => `nav-item ${isActive ? 'active-link' : ''}`}
            onClick={() => handleNavClick('AboutUs')}
          >
            <span className="nav-text">AboutUs</span>
            <span className="nav-underline"></span>
          </NavLink>
        </div>

        {/* Right Side - User Actions */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <NavLink to="/profile" className="profile-link">
            <User className="user-icon" />
          </NavLink>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <button
              className="sign-in-btn"
              onClick={() => window.Clerk?.openSignIn()}
              style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontWeight: 500 }}
            >
              Sign In
            </button>
          )}
        </div>
        {/* Mobile Overlay */}
        {isOpen && <div className="mobile-overlay" onClick={() => setIsOpen(false)}></div>}
      </div>
    </nav>
  );
}

export default Navbar;