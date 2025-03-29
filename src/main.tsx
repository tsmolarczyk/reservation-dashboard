import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import AddReservation from './components/AddReservation/AddReservation.tsx';
import EditReservation from './components/EditReservation/EditReservation.tsx';
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: 'add',
    element: <AddReservation />,
    errorElement: <ErrorPage />
  },
  {
    path: 'edit/:id',
    element: <EditReservation />,
    errorElement: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
