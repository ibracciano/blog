// import React from 'react'

import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="bg-slate-900 text-white min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
