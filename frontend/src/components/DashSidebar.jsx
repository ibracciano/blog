// import React from 'react'
import { FaUserAlt } from "react-icons/fa";

const DashSidebar = () => {
  return (
    <div className="pt-24 pb-6 mb:pb-10">
      <div className="flex items-center justify-between px-5 py-2 mx-5 rounded-md bg-slate-600">
        <div className="flex items-center gap-5">
          <FaUserAlt size={20} />
          <p className="text-xl">Profile</p>
        </div>
        <span className="px-2 py-1 rounded-md bg-slate-950">User</span>
      </div>

      <p className="px-3 mx-5 mt-5"> &rarr; Sign Out</p>
    </div>
  );
};

export default DashSidebar;
