import './App.css';
import NavBar from './components/navigation/navBar/NavBar';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from "./utils/ScrollToTop";
import { useEffect } from "react";
import useAuthStore from "./stores/zustand/AuthStore";
import { jwtDecode, JwtPayload } from 'jwt-decode';

// Estendi il tipo JwtPayload
interface CustomJwtPayload extends JwtPayload {
  name: string;
  email: string;
}

function App() {
  const { setIsLoggedIn, updateUsername, updateEmail } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3030/users/token/check', {
        method: 'post',
        headers: {
          authorization: 'Bearer ' + token
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP status ${res.status}`);
          }
        })
        .then(() => {
          const user = jwtDecode<CustomJwtPayload>(token);
          updateUsername(user.name)
          updateEmail(user.email)
          setIsLoggedIn(true)
        })
        .catch(error => {
          console.log(error)
          setIsLoggedIn(false)
        })
    }
    else {
      console.log('token non presente o scaduto')
      setIsLoggedIn(false)
    }
  }, [])


  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
