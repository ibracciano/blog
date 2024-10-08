// import React from 'react'

import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import axios from "axios";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  // console.log(location);
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  // console.log(currentUser);

  // navigation for mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (location.pathname) {
      setOpenModal(false);
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  // navigation for desktop
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(api.signOut);
      if (response.data.success) {
        dispatch(logoutUser());
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (term) {
      window.location.href = `/search/${term}`;
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="relative text-white bg-slate-950">
        {/* navgation for desktop */}
        <nav className="w-[90%] md:w-[90%] mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="self-center text-lg font-semibold text-white md:text-lg whitespace-nowrap"
          >
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Ouattara's
            </span>
            Blog
          </Link>

          {/* searchBar */}

          <form className="hidden md:block mx-2 md:w-[40%] bg-slate-800">
            <label
              htmlFor="default-search"
              className="mb-2 text-[5px] md:text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="ecommerce, blog, others"
                required
                onChange={(e) => setTerm(e.target.value)}
              />
              <button
                onClick={handleSearch}
                type="submit"
                className="absolute inset-y-0 px-1 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg md:px-4 end-0 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          {/* menu */}
          <ul className="items-center hidden gap-5 md:flex">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-black px-2"
                      : ""
                  }
                >
                  {link.name}{" "}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* connexion */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {/* image profile */}
              <div
                className="w-10 h-10 border-4 border-blue-500 rounded-full cursor-pointer"
                onClick={() => setOpenModal(!openModal)}
              >
                {currentUser.photo ? (
                  <img
                    src={currentUser.photo}
                    alt="profile"
                    className="w-full h-full bg-cover rounded-full"
                  />
                ) : (
                  <FaUserCircle />
                )}
              </div>
              {/* name profile */}
              <p className="text-xs">{currentUser.username.split(" ")[0]}</p>
              {openModal && (
                <div className="flex flex-col bg-slate-800 fixed top-[72px] right-16 md:right-24 rounded-md z-50">
                  <p className="flex flex-col px-2 py-1 text-sm rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">
                    <span>{`@ ${currentUser.username}`}</span>
                    <span>{currentUser.email}</span>
                  </p>
                  <Link
                    to={`/dashboard/profile/${currentUser.username}`}
                    className="px-2 py-1 border rounded-md border-slate-700 hover:bg-slate-900"
                  >
                    My Profile
                  </Link>

                  {currentUser.role === "admin" && (
                    <Link
                      to={`/dashboard`}
                      className="px-2 py-1 border rounded-md border-slate-700 hover:bg-slate-900"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    className="px-2 py-1 border rounded-md text-start border-slate-700 hover:bg-slate-900"
                    onClick={handleLogout}
                  >
                    SignOut
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="px-2 py-1 transition-all duration-100 rounded-md md:text-base bg-gradient-to-r from-cyan-500 to-blue-500 hover:outline"
            >
              Sign In
            </Link>
          )}

          {/* burger menu */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <RxCross2 size={30} /> : <HiMenu size={30} />}
          </button>
        </nav>

        {/* mobile menu */}
        {/* dropdown menu for mobile */}
        {isMenuOpen && (
          <div>
            <form className="md:hidden mx-4 border-2 rounded-md border-teal-500 md:w-[40%] bg-slate-800">
              <label
                htmlFor="default-search"
                className="mb-2 text-[5px] md:text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="ecommerce, blog, others"
                  required
                  onChange={(e) => setTerm(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  type="submit"
                  className="absolute inset-y-0 px-1 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg md:px-4 end-0 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
            <ul className="w-full px-[5%] py-3 flex flex-col gap-1 md:hidden  bg-slate-950 z-50">
              {links.map((link, index) => (
                <li key={index} className="w-full">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 w-full inline-flex bg-slate-900 border-2 border-slate-800 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-black"
                        : "px-2 inline-flex w-full border-2 border-slate-800 py-1 rounded-md bg-slate-900"
                    }
                  >
                    {link.name}{" "}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
