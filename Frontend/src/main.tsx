import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import TourSingle from './pages/TourSingle.tsx';

import { ThemeProvider } from '@material-tailwind/react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewTour from './pages/NewTour.tsx';
import DashboardBody from './components/navigation/DashboardBody.tsx';
import SuccessGithubAuth from './pages/SuccessGithubAuth.tsx';
import SuccessGoogleAuth from './pages/SuccessGoogleAuth.tsx';
import Tours from "./pages/Tours.tsx";

const Home = lazy(() => import('./pages/home/Home.tsx'));
const DashBoard = lazy(() => import('./pages/DashBoard.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/google/success',
        element: <SuccessGoogleAuth />,
      },
      {
        path: '/github/success',
        element: <SuccessGithubAuth />,
      },
      {
        path: '/tours/',
        element: <Tours />,
      },
      {
        path: '/diventa-partner',
        element: <div className="py-32 text-center text-gray-700"><h1 className="text-4xl font-bold text-[#E29C00]">Diventa Partner</h1><p className="mt-4 text-lg">Questa sezione sarà presto disponibile!</p></div>,
      },
      {
        path: '/assistenza',
        element: <div className="py-32 text-center text-gray-700"><h1 className="text-4xl font-bold text-[#E29C00]">Assistenza</h1><p className="mt-4 text-lg">Il nostro supporto clienti sarà presto online.</p></div>,
      },
      {
        path: '/carrello',
        element: <div className="py-32 text-center text-gray-700"><h1 className="text-4xl font-bold text-[#E29C00]">Carrello Vuoto</h1><p className="mt-4 text-lg">Non hai ancora aggiunto tour al carrello.</p></div>,
      },
      {
        path: '/tours/:tourId',
        element: <TourSingle />,
      },
      {
        path: '/dashboard',
        element: (
          <Suspense>
            <DashBoard />
          </Suspense>
        ),
        children: [
          {
            path: '',
            element: <DashboardBody />,
          },
          {
            path: 'nuovo-tour',
            element: <NewTour />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>,
);
