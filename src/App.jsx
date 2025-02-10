import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CitaTattoo from './pages/Cita-Tattoo.jsx'
import { useEffect, useState } from 'react'

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    // Cogemos la preferencia del localStorage
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (


    <section className={`App ${darkMode ? 'dark' : ''}`}>
      <Header darkmode={darkMode} toggleTheme={toggleTheme} />
      <main>
          <Routes>
              <Route path='/' element={<Home darkMode={darkMode} />} />
              <Route path='/citaTattoo' element={<CitaTattoo />} />
          </Routes>
      </main>
      <Footer />
    </section>
    
  )
}

export default App
