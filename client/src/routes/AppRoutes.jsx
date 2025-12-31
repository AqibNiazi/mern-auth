import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import EmailVerify from "../pages/EmailVerify";
import ResetPassword from "../pages/ResetPassword";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "email-verify",
          element: <EmailVerify />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
