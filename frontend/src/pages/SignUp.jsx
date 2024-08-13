// import React from 'react'
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [hidden, setHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setHidden(!hidden);
  };
  return (
    <main className="pt-32">
      <div className="w-[90%] md:w-[30%] mx-auto">
        <div className="p-5 shadow shadow-slate-800">
          <h1 className="text-3xl font-bold text-center mb-2">Sign Up</h1>
          <form className="w-full flex flex-col gap-3">
            {/* username */}
            <div>
              <label htmlFor="username" className="text-slate-500">
                Your username
              </label>{" "}
              <br />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="w-full p-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-black"
              />
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="text-slate-500">
                Your email
              </label>{" "}
              <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="test@example.com"
                className="w-full p-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-black"
              />
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="text-slate-500">
                Your password
              </label>{" "}
              <br />
              <div className="flex items-center justify-between">
                <input
                  type={hidden ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="password"
                  className="w-[90%] p-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-black"
                />
                <p
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-md"
                >
                  {hidden ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                </p>
              </div>
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full mt-5 py-2 rounded-md focus:ring-2 focus:ring-white"
            >
              SignUp
            </button>
          </form>

          {/* google button */}
          <button className="flex items-center justify-center gap-2 outline p-2 rounded-md mt-5 w-full hover:bg-gradient-to-r from-cyan-500 to-blue-500">
            <FcGoogle size={30} />
            <span>Continue with Google</span>
          </button>

          {/* already text */}
          <p className="mt-4 flex items-center justify-between">
            <span>Already have an account ?</span>{" "}
            <Link
              to="/sign-in"
              className="italic bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
