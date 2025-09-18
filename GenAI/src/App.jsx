import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Internship from './components/Internship'
import AboutUs from './components/AboutUs'
import FetchAPI from './components/FetchAPI'
import { SignUp, SignIn, useUser } from '@clerk/clerk-react';

function App() {
  const [showMain, setShowMain] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  // Shared handler for all main action buttons
  const handleProtectedAction = (callback) => {
    if (isSignedIn) {
      callback();
    } else {
      setShowSignIn(true);
    }
  };

  const handleScroll = () => {
    if (!showMain) {
      setShowMain(true);
      navigate("/home");
    }
  };

  const handleSignInClose = () => {
    setShowSignIn(false);
  };

  return (
    <div className="App">
      {!showMain ? (
        <Welcome onScroll={handleScroll} onProtectedAction={handleProtectedAction} />
      ) : (
        <>
          <Navbar onSignIn={() => setShowSignIn(true)} onSignUp={() => setShowSignUp(true)} />
          <Routes>
            <Route path="/" element={<Home onProtectedAction={handleProtectedAction} />} />
            <Route path="/home" element={<Home onProtectedAction={handleProtectedAction} />} />
            <Route path="/Internship" element={<FetchAPI />} />
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
        </>
      )}

      {showSignIn && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ position: 'relative', background: '#fff', borderRadius: 8, padding: 32 }}>
            <button style={{ position: 'absolute', top: 8, right: 8, fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleSignInClose}>×</button>
            <SignIn afterSignInUrl="/home" />
          </div>
        </div>
      )}

      {showSignUp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ position: 'relative', background: '#fff', borderRadius: 8, padding: 32 }}>
            <button style={{ position: 'absolute', top: 8, right: 8, fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowSignUp(false)}>×</button>
            <SignUp afterSignUpUrl="/home" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App
