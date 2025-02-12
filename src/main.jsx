import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoginProvider } from './context/LoginContext.jsx'
import { DarkModeProvider } from './context/DarkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <DarkModeProvider>
    <LoginProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginProvider>
  </DarkModeProvider>
  
)
