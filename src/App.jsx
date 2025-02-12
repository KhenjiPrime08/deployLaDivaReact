import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useContext, useEffect, useState } from 'react'
import AppRoutes from './routes/AppRoutes';
import LoginContext from './context/LoginContext';
import { DarkModeContext } from './context/DarkModeContext';


function App() {
  

  return (


    <section>
      <Header/>
        <main>
          <AppRoutes/>
        </main>
      <Footer />
    </section>
    
  )
}

export default App
