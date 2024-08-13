// import React from 'react'
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
// import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import Google from "../components/Google";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [infos, setInfos] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInfos({ ...infos, [event.target.name]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (infos.email === "" || infos.password === "") {
      toast.warning(" all fields are required");
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        infos
      );
      if (res.status === 200) {
        toast.success("signin successful");
        dispatch(loginUser(res.data));
        // Reset form fields
        setInfos({ email: "", password: "" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      // console.log(res)
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setHidden(!hidden);
  };

  return (
    <main className="pt-32">
      <div className="w-[90%] md:w-[30%] mx-auto">
        <div className="p-5 shadow shadow-slate-800">
          <h1 className="mb-2 text-3xl font-bold text-center">Sign In</h1>
          <form
            className="flex flex-col w-full gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
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
              SignIn
            </button>
          </form>

          <Google />

          {/* already text */}
          <p className="flex items-center justify-between mt-4">
            <span>Don't have an account ?</span>{" "}
            <Link
              to="/sign-up"
              className="italic text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
