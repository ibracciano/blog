// import React from "react";

import { Outlet } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";

const Dashbord = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-slate-800  shadow shadow-sky-500 md:min-h-screen md:w-[20%]">
        <DashSidebar />
      </div>
      <div className="md:w-[80%] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashbord;
