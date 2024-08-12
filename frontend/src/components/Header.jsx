// import React from 'react'
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Header = () => {
  // navigation for mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // navigation for desktop
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="bg-slate-950 text-white relative">
        {/* navgation for desktop */}
        <nav className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <h1>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xl font-bold p-1 rounded-md">
              My
            </span>
            <span className="font-bold">BLOG</span>
          </h1>

          {/* searchBar */}
          <form className="flex items-center justify-between gap-2 bg-slate-800 p-2 rounded-md w-[40px] md:w-[300px]">
            <input
              type="text"
              placeholder="search..."
              className="bg-slate-800 outline-none hidden md:flex"
            />
            <button className="bg-gradient-to-r from-slate-500 to-gray-700 p-1 rounded-full">
              <CiSearch />
            </button>
          </form>

          {/* menu */}
          <ul className="md:flex items-center gap-5 hidden">
            {links.map((link, index) => (
              <NavLink
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-black"
                    : ""
                }
              >
                {link.name}{" "}
              </NavLink>
            ))}
          </ul>

          {/* connexion */}
          <div>
            {/* image profile */}
            {/* <div>
              <img src="" alt="profile" />
            </div> */}
            {/* name profile */}
            {/* <p>papa</p> */}
          </div>

          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 py-1 px-2 rounded-md hover:outline transition-all duration-100">
            Sign In
          </button>

          {/* burger menu */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <RxCross2 size={30} /> : <HiMenu size={30} />}
          </button>
        </nav>

        {/* mobile menu */}
        {/* dropdown menu for mobile */}
        {isMenuOpen && (
          <ul className="w-full px-[5%] py-3 flex flex-col gap-1 md:hidden absolute top-[70px] bg-slate-950">
            {links.map((link, index) => (
              <NavLink
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "bg-slate-900 border-2 border-slate-800 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-black"
                    : "border-2 border-slate-800 py-1 rounded-md bg-slate-900"
                }
              >
                {link.name}{" "}
              </NavLink>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
