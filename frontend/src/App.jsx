// import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashbord from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Projects from "./pages/Projects";
import DashProfile from "./pages/DashProfile";
import EmailVerify from "./pages/EmailVerify";
import { getUserAuthentificated, verifyUserAuthentication } from "./utils/hook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/userSlice";
// import { privateRoute } from "./utils/hook"

const App = () => {
  const dispatch = useDispatch();

  const getUserAuth = async () => {
    try {
      const user = await getUserAuthentificated();
      // console.log(user);
      dispatch(loginUser(user));
    } catch (error) {
      console.error("Erreur dans getUserAuth", error);
    }
  };

  useEffect(() => {
    getUserAuth();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "sign-in", element: <SignIn /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "verify-email", element: <EmailVerify /> },
        { path: "projects", element: <Projects /> },
        {
          path: "dashboard",
          element: <Dashbord />,
          children: [
            {
              path: "profile/:username",
              element: <DashProfile />,
              loader: verifyUserAuthentication,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
