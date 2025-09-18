import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bot, Menu, X, User, ChevronDown } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedNav, setClickedNav] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section within home page
  const scrollToHomeSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  // Set document title when nav item clicked
  useEffect(() => {
    if (clickedNav) {
      document.title = clickedNav;
    }
  }, [clickedNav]);

  // Scroll to hash link if redirected to home with #id
  useEffect(() => {
    const handleHashLink = () => {
      if (location.pathname === '/' && window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
          scrollToHomeSection(sectionId);
        }, 100);
      }
    };
    handleHashLink();
  }, [location]);

  // Add background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click
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

        {/* Hamburger Menu (Mobile) */}
        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
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
            onClick={() => handleNavClick('Internships')}
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
            to="/aboutus"
            className={({ isActive }) => `nav-item ${isActive ? 'active-link' : ''}`}
            onClick={() => handleNavClick('AboutUs')}
          >
            <span className="nav-text">About Us</span>
            <span className="nav-underline"></span>
          </NavLink>
        </div>

        {/* Right Side - User Actions */}
        <div className="nav-right">
          <div className="user-menu">
            <button 
              className="user-menu-btn"
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <User className="user-icon" />
              <ChevronDown className={`chevron-icon ${userDropdown ? 'rotated' : ''}`} />
            </button>
            
            <div className={`user-dropdown ${userDropdown ? 'active' : ''}`}>
              <NavLink
                to="/login"
                className="dropdown-item"
                onClick={() => handleNavClick('Login')}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="dropdown-item"
                onClick={() => handleNavClick('Sign Up')}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/profile"
                className="dropdown-item"
                onClick={() => handleNavClick('Profile')}
              >
                Profile
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && <div className="mobile-overlay" onClick={() => setIsOpen(false)}></div>}
      </div>
    </nav>
  );
}

export default Navbar;
