import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <DarkModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </DarkModeProvider>
  
)
