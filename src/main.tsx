import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import TourSingle from "./pages/TourSingle.tsx";
import Home from "./home/Home.tsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: "/tours/:tourId",
        element: <TourSingle />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
