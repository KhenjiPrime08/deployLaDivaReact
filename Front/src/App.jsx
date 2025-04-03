import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes';
import i18n from './utils/i18n.js';
import { I18nextProvider } from 'react-i18next';
import HeaderAdmin from './components/HeaderAdmin.jsx';
import { useContext } from 'react';
import { UserContext } from './context/userContext.jsx';



function App() {
  const {isAdmin} = useContext(UserContext);
  return (


    <section>
      <I18nextProvider i18n={i18n}>  {/* Aquí envolvemos la App entera traductor, mirar como funciona*/}
        {isAdmin ? <HeaderAdmin /> : <Header />}  
          <main>
            <AppRoutes/>
          </main>
        <Footer />
      </I18nextProvider>
    </section>
    
  )
}

export default App
