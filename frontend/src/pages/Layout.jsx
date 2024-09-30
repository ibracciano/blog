// import React from 'react'

import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

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
