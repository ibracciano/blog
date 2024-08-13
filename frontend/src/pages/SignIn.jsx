// import React from 'react'
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
    const navigate = useNavigate();
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
            await axios.post("http://localhost:3000/api/auth/signin", infos);
            toast.success("signin successful");
            // Reset form fields
            setInfos({ email: "", password: "" });
            setTimeout(() => {
                navigate("/sign-up");
            }, 1000);
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
                    <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>
                    <form
                        className="w-full flex flex-col gap-3"
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
                                className="w-full p-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-black"
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
                            SignIn
                        </button>
                    </form>

                    {/* google button */}
                    <button className="flex items-center justify-center gap-2 outline p-2 rounded-md mt-5 w-full hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                        <FcGoogle size={30} />
                        <span>Continue with Google</span>
                    </button>

                    {/* already text */}
                    <p className="mt-4 flex items-center justify-between">
                        <span>Don't have an account ?</span>{" "}
                        <Link
                            to="/sign-up"
                            className="italic bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
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
