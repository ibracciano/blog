// import React from 'react'

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen text-white bg-slate-900">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
