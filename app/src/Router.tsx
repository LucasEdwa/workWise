import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <AuthPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
    ],
  },
]);