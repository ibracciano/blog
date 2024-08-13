// import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  // console.log(currentUser);

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
    <header className="fixed top-0 z-50 w-full">
      <div className="relative text-white bg-slate-950">
        {/* navgation for desktop */}
        <nav className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <h1>
            <span className="p-1 text-xl font-bold rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">
              My
            </span>
            <span className="font-bold">BLOG</span>
          </h1>

          {/* searchBar */}
          <form className="flex items-center justify-between gap-2 bg-slate-800 p-2 rounded-md w-[40px] md:w-[300px]">
            <input
              type="text"
              placeholder="search..."
              className="hidden outline-none bg-slate-800 md:flex"
            />
            <button className="p-1 rounded-full bg-gradient-to-r from-slate-500 to-gray-700">
              <CiSearch />
            </button>
          </form>

          {/* menu */}
          <ul className="items-center hidden gap-5 md:flex">
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

          {currentUser ? (
            <div className="flex items-center gap-2">
              {/* image profile */}
              <div
                className="w-10 h-10 cursor-pointer"
                onClick={() => setOpenModal(!openModal)}
              >
                <img
                  src={currentUser.photo}
                  alt="profile"
                  className="w-full rounded-full"
                />
              </div>
              {/* name profile */}
              <p>{currentUser.username.slice(0, 4)}</p>
              {openModal && (
                <div className="absolute flex flex-col bg-slate-800 top-[72px] rounded-md">
                  <p className="px-2 py-1 text-sm rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">{`@ ${currentUser.username}`}</p>
                  <Link className="px-2 py-1 border rounded-md border-slate-700 hover:bg-slate-900">
                    My Profile
                  </Link>
                  <span className="px-2 py-1 border rounded-md border-slate-700 hover:bg-slate-900">
                    SignOut
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="px-2 py-1 transition-all duration-100 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:outline"
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
