import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Internship from './components/Internship'
import AboutUs from './components/AboutUs'

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
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path='/Internship' element={<Internship/>} />
            <Route path="/AboutUs" element={<AboutUs />} />

          </Routes>
        </>
      )}
    </div>
  )
}

export default App
