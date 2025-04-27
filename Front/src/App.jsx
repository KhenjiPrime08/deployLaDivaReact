import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes';
import i18n from './utils/i18n.js';
import { I18nextProvider } from 'react-i18next';
import HeaderAdmin from './components/HeaderAdmin.jsx';
import { useContext } from 'react';
import { UserContext } from './context/userContext.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



const stripePromise = loadStripe("pk_test_51RCOl3CKE26wFEjBtSkNtmxg7DpkR00glNBcPkER7MJdHqH7C6VJTUoCM90zK4nowvSMWCuBBVfQxwX5q84sSefR00ia0n7ZTJ") //Clave pública de Stripe

function App() {

  const {isAdmin} = useContext(UserContext);
  
  return (

    <section>
      <I18nextProvider i18n={i18n}>  {/* Aquí envolvemos la App entera traductor, mirar como funciona*/}
        <Elements stripe={stripePromise}>
          {isAdmin ? <HeaderAdmin /> : <Header />}  
            <main>
              <AppRoutes/>
            </main>
          <Footer />
        </Elements>
      </I18nextProvider>
    </section>
    
  )
}

export default App
