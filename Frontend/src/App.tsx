import './App.css';
import NavBar from './components/navigation/navBar/NavBar';
import Footer from './components/footer/Footer';
import { Outlet, useSearchParams } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import useTokenPayload from './hooks/useTokenPayload';

function App() {
  const [searchParams] = useSearchParams();

  useTokenPayload();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '6', 10);

  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollToTop dependencies={[page, limit]} />
      <Footer />
    </>
  );
}

export default App;
