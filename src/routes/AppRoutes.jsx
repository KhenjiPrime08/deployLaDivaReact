import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import CitaTattoo from '../pages/CitaTattoo.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import CitaPiercing from '../pages/CitaPiercing.jsx'
import SobreNosotros from '../pages/SobreNosotros.jsx'
import Perfil from '../pages/Perfil.jsx'
import Admin from '../pages/Admin.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import { DarkModeContext } from '../context/DarkModeContext.jsx'
import CitaGema from '../pages/CitaGema.jsx'
import InkYaque from '../pages/InkYaque.jsx'
import TotoTattoo from '../pages/TotoTattoo.jsx'
import McPiercing from '../pages/McPIercing.jsx'
import Iris_Gems from '../pages/Iris_Gems.jsx'



function AppRoutes(logged) {
   const { darkMode } = useContext(DarkModeContext);

  return (
    
        <Routes>
            <Route path='/' element={<Home darkMode={darkMode} logged={logged}/>} />
            <Route path='/citaTattoo' element={<CitaTattoo />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/citaPiercing' element={<CitaPiercing />} />
            <Route path='/citaGema' element={<CitaGema />} />
            <Route path='/sobreNosotros' element={<SobreNosotros />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/inkYaque' element={<InkYaque />} />
            <Route path='/totoTattoo' element={<TotoTattoo />} />
            <Route path='/McPiercing' element={<McPiercing />} />
            <Route path='/irisGems' element={<Iris_Gems />} />

            {/*Ruta protegida */}
            <Route path='/admin' element={<PrivateRoute> <Admin /> </PrivateRoute>} />
        </Routes>
    
    
  )
}

export default AppRoutes