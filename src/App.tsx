import './App.css'
import NavBar from "./components/navigation/navBar/navBar"
import Footer from "./components/footer/Footer"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>

  )
}

export default App
