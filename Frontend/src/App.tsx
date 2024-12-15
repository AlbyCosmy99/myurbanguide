import './App.css';
import NavBar from './components/navigation/navBar/NavBar';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from "./utils/ScrollToTop";
import useTokenPayload from "./hooks/useTokenPayload";


function App() {

  useTokenPayload();

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
