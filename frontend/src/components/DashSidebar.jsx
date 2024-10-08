// import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdComment } from "react-icons/md";

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="pt-24 pb-6 space-y-4 mb:pb-10">
      <div className="flex items-center justify-between px-5 py-2 mx-5 rounded-md bg-slate-600">
        <Link
          to={`/dashboard/profile/${currentUser.username}`}
          className="flex items-center justify-between gap-5"
        >
          <FaUserAlt size={20} />
          <p className="text-xl">Profile</p>
        </Link>
        <span className="px-2 py-1 rounded-md bg-slate-950">
          {currentUser.role}
        </span>
      </div>

      {currentUser.role === "admin" && (
        <div className="px-5 py-2 mx-5 transition-all duration-500 rounded-md bg-slate-600 hover:bg-slate-700">
          <div>
            <Link to="/dashboard/all-posts" className="flex items-center gap-5">
              <BsFileEarmarkPost size={20} />
              <p className="text-xl">Posts</p>
            </Link>
          </div>
        </div>
      )}

      {currentUser.role === "admin" && (
        <div className="px-5 py-2 mx-5 transition-all duration-500 rounded-md bg-slate-600 hover:bg-slate-700">
          <div>
            <Link to="/dashboard/all-users" className="flex items-center gap-5">
              <FaUsersViewfinder size={20} />
              <p className="text-xl">Users</p>
            </Link>
          </div>
        </div>
      )}

      {currentUser.role === "admin" && (
        <div className="px-5 py-2 mx-5 transition-all duration-500 rounded-md bg-slate-600 hover:bg-slate-700">
          <div>
            <Link
              to="/dashboard/dash-comments"
              className="flex items-center gap-5"
            >
              <MdComment size={20} />
              <p className="text-xl">Comments</p>
            </Link>
          </div>
        </div>
      )}

      <p className="px-3 mx-5 mt-5"> &rarr; Sign Out</p>
    </div>
  );
};

export default DashSidebar;
