import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes';



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
