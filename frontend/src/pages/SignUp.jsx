// import React from 'react'
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../utils/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [infos, setInfos] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInfos({ ...infos, [event.target.name]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        infos.email === "" ||
        infos.password === "" ||
        infos.username === ""
      ) {
        toast.warning("Tous les champs sont requis");
      }
      const response = await axios.post(api.signUp, infos);

      // console.log(response);
      if (response.data.success) {
        toast.success("Votre inscription a réussi");
        navigate("/sign-in");
        setInfos({ username: "", email: "", password: "" });
        setTimeout(() => {
          navigate("/verify-email");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error:", error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setHidden(!hidden);
  };

  return (
    <main className="pt-32">
      <div className="w-[90%] md:w-[30%] mx-auto">
        <div className="p-5 shadow shadow-slate-800">
          <h1 className="mb-2 text-3xl font-bold text-center">Sign Up</h1>
          <form
            className="flex flex-col w-full gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
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
                value={infos.username}
                autoComplete="username"
                className="w-full p-2 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(e)}
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
                value={infos.email}
                autoComplete="email"
                className="w-full p-2 text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(e)}
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
                  value={infos.password}
                  autoComplete="current-password"
                  className="w-[90%] p-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-black"
                  onChange={(e) => handleChange(e)}
                />
                <p
                  onClick={togglePasswordVisibility}
                  className="p-3 rounded-md cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                  {hidden ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                </p>
              </div>
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="w-full py-2 mt-5 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-2 focus:ring-white"
            >
              SignUp
            </button>
          </form>

          {/* google button */}
          <button className="flex items-center justify-center w-full gap-2 p-2 mt-5 rounded-md outline hover:bg-gradient-to-r from-cyan-500 to-blue-500">
            <FcGoogle size={30} />
            <span>Continue with Google</span>
          </button>

          {/* already text */}
          <p className="flex items-center justify-between mt-4">
            <span>Already have an account ?</span>{" "}
            <Link
              to="/sign-in"
              className="italic text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
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
