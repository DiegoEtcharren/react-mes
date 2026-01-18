import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from "./layouts/AuthLayout";
import Login from './views/Login';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
]);

export default router;
