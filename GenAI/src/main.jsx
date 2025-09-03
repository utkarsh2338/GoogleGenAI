import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Set your Clerk publishable key in .env file as VITE_CLERK_PUBLISHABLE_KEY
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "your-clerk-publishable-key";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
