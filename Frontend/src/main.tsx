import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import TourSingle from './pages/TourSingle.tsx';

import { ThemeProvider } from '@material-tailwind/react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewTour from "./pages/NewTour.tsx";
import DashboardBody from "./components/navigation/DashboardBody.tsx";
import SuccessAuth from "./pages/SuccessAuth.tsx";

import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import lightbox from 'alpine-tailwind-lightbox';

Alpine.plugin(focus);
Alpine.plugin(lightbox);

Alpine.start();

const Home = lazy(() => import('./pages/home/Home.tsx'))
const Tours = lazy(() => import("./pages/Tours.tsx"))
const DashBoard = lazy(() => import("./pages/DashBoard.tsx"))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Suspense><Home /></Suspense>,
      },
      {
        path: '/success',
        element: <SuccessAuth />
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
        path: '/dashboard',
        element: <Suspense><DashBoard /></Suspense>,
        children: [
          {
            path: '',
            element: <DashboardBody />
          },
          {
            path: 'nuovo-tour',
            element: <NewTour />
          },
        ]
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
