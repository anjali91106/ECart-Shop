import './App.css'
import { Outlet } from 'react-router-dom'
import Menu from './Components/Menu'
import Footer from './Components/Footer'

function App() {
  return (
    <>
      <Menu/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
