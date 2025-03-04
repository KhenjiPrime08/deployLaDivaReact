import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes';
import i18n from './utils/i18n.js';
import { I18nextProvider } from 'react-i18next';



function App() {
  

  return (


    <section>
      <I18nextProvider i18n={i18n}>  {/* Aquí envolvemos la App entera */}
        <Header/>
          <main>
            <AppRoutes/>
          </main>
        <Footer />
      </I18nextProvider>
    </section>
    
  )
}

export default App
