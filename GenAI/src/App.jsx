import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {
  const [showMain, setShowMain] = useState(false)
  const navigate = useNavigate()

  const handleScroll = () => {
    if (!showMain) {
      setShowMain(true)
      navigate("/home")   // 👈 auto-redirect
    }
  }

  return (
    <div className="App">
      {!showMain ? (
        <Welcome onScroll={handleScroll} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
