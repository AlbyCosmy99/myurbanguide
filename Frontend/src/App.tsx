import './App.css';
import NavBar from './components/navigation/navBar/NavBar';
import Footer from './components/footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import ScrollToTop from "./utils/ScrollToTop";
import { useEffect } from "react";
import useAuthStore from "./stores/zustand/AuthStore";
import { jwtDecode } from "jwt-decode";
import User from "./types/User";


function App() {
  const navigate = useNavigate()
  const { updateUser } = useAuthStore()

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
            localStorage.removeItem('token')
            updateUser(null)
          } else {
            const user = jwtDecode<User>(token);
            updateUser(user)
            navigate('/dashboard')
          }
        })
        .catch(() => {
          localStorage.removeItem('token')
          updateUser(null)
        })
    }
    else {
      localStorage.removeItem('token')
      updateUser(null)

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
