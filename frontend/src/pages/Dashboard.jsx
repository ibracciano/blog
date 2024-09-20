// import React from "react";

import { Outlet } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-slate-800 shadow shadow-sky-500 md:min-h-screen md:w-[20%] fixed left-0 right-0 z-20">
        <DashSidebar />
      </div>
      <div className="mt-[40%] md:mt-0 md:ml-[20%] md:w-[80%] min-h-screen ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
