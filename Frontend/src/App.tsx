import './App.css';
import NavBar from './components/navigation/navBar/NavBar';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from "./utils/ScrollToTop";
import { checkTokenPayload } from "./hooks/useTokenPayload";
import { useEffect } from "react";
import useAuthStore from "./stores/zustand/AuthStore";
import { useNavigate } from "react-router-dom";

function App() {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkTokenPayload(updateUser, navigate, user)
    }, 300)

    return () => clearTimeout(timeout)
  }, [user]);

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
