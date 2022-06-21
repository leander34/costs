import { BrowserRouter } from 'react-router-dom'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container customClass='min-height'>
      <Routes />
      </Container>
      

      <Footer/>
    </BrowserRouter>
  )
}

export default App
