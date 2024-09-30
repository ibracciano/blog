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
import {
  getUserAuthentificated,
  verifyAdminAuthentication,
  verifyUserAuthentication,
} from "./utils/hook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/userSlice";
import CreatePost from "./pages/admin/CreatePost";
import AllPosts from "./pages/admin/AllPosts";
import UpdatePost from "./pages/admin/UpdatePost";
import AllUsers from "./pages/admin/AllUsers";
import PostPage from "./pages/PostPage";
import DashComment from "./pages/admin/DashComment";
import DashComponent from "./components/DashComponent";
import NotFound from "./pages/NotFound";
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
      errorElement: <NotFound />,
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "sign-in", element: <SignIn /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "verify-email", element: <EmailVerify /> },
        { path: "projects", element: <Projects /> },
        { path: "post/:slug", element: <PostPage /> },
        {
          path: "dashboard",
          element: <Dashbord />,
          children: [
            {
              path: "",
              element: <DashComponent />,
              loader: verifyUserAuthentication,
            },
            {
              path: "profile/:username",
              element: <DashProfile />,
              loader: verifyUserAuthentication,
            },
            {
              path: "create-post",
              element: <CreatePost />,
              loader: verifyAdminAuthentication,
            },
            {
              path: "update-post/:idPost",
              element: <UpdatePost />,
              loader: verifyAdminAuthentication,
            },
            {
              path: "all-posts",
              element: <AllPosts />,
              loader: verifyAdminAuthentication,
            },
            {
              path: "all-users",
              element: <AllUsers />,
              loader: verifyAdminAuthentication,
            },
            {
              path: "dash-comments",
              element: <DashComment />,
              loader: verifyAdminAuthentication,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
