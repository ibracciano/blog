// import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashbord from "./pages/Dashbord"
import Layout from "./pages/Layout"

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "sign-in", element: <SignIn /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "dashboard", element: <Dashbord /> },
        { path: "projects", element: <Dashbord /> },
      ]
    },
    // Add more routes here

    // Add more routes here
  ])
  return (
    <RouterProvider router={routes} />
  )
}

export default App