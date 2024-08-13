// import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashbord from "./pages/Dashbord"
import Layout from "./pages/Layout"
import Projects from "./pages/Projects"
import DashProfile from "./pages/DashProfile"
// import { privateRoute } from "./utils/hook"


const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "sign-in", element: <SignIn /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "projects", element: <Projects /> },
        {
          path: "dashboard", element: <Dashbord />, children: [
            { path: "profile/:username", element: <DashProfile /> }
          ]
        },

      ]
    },
  ])
  return (
    <RouterProvider router={routes} />
  )
}

export default App