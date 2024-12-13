import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import TourSingle from './pages/TourSingle.tsx';

import { ThemeProvider } from '@material-tailwind/react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewTour from "./pages/NewTour.tsx";
import DashBoard from "./pages/DashBoard.tsx";

const Home = lazy(() => import('./pages/home/Home.tsx'))
const Tours = lazy(() => import("./pages/Tours.tsx"))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Suspense fallback={<div>loading</div>}><Home /></Suspense>,
      },
      {
        path: '/tours/',
        element: <Tours />,
      },
      {
        path: '/tours/:tourId',
        element: <TourSingle />,
      },
      {
        path: '/new-tour/',
        element: <NewTour />,
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      }
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
