import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import { useUser, SignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';

import { useState } from 'react';
function App() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleDiscoverClick = () => {
    if (isSignedIn) {
      navigate('/home');
    } else {
      setShowSignIn(true);
    }
  };

  const handleSignInClose = () => {
    setShowSignIn(false);
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome onScroll={handleDiscoverClick} />} />
        <Route path="/home" element={<Home />} />
        {/* Add more routes here as needed */}
      </Routes>
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
    </div>
  );
}

function SignInPage() {
  return <SignIn />;
}

export default App;
