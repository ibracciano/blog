// import React from 'react'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../utils/uploadImage";
import Loading from "../assets/loading.gif";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../utils/api";
import { loginUser, logoutUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DashProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: currentUser.username,
    email: currentUser.email,
    photo: currentUser.photo,
    password: "",
  });

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // upload de photo
  const handleUploadPhoto = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    // console.log(file);
    const uploadImageCloudinary = await uploadImage(file);
    // console.log(uploadImageCloudinary);
    setUserInfo({ ...userInfo, photo: uploadImageCloudinary.secure_url });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // envoyer les informations de modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(api.updateProfileUser, userInfo);
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(loginUser(res.data.data));
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  // se deconnecter
  const handleLogout = async () => {
    try {
      const response = await axios.post(api.signOut);
      if (response.data.success) {
        dispatch(logoutUser());
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  // supprimer mon compte
  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
        });
        try {
          const response = await axios.post(api.removeProfileUser, {
            id: currentUser._id,
          });

          if (response.data.success) {
            dispatch(logoutUser());
            toast.success(response.data.message);
            navigate("/");
          }
        } catch (error) {
          console.error(error.response.data.message);
        }
      }
    });
  };

  return (
    <div className="w-full pt-[180px] pb-40 md:pt-24">
      <h1 className="mb-2 text-xl text-center md:text-3xl">My Profile</h1>
      <form
        className="flex flex-col items-center justify-center gap-4 py-8 bg-black border-t-2 border-b-2 border-cyan-500 md:mt-10"
        onSubmit={handleSubmit}
      >
        <div
          className="w-16 h-16 border-4 rounded-full md:w-20 md:h-20 border-cyan-500"
          data-aos="zoom-out-down"
        >
          <img
            src={!loading ? userInfo.photo : Loading}
            alt="profile-photo"
            className="w-full h-full rounded-full md:mb-10"
          />
        </div>

        <p className="text-red-500">
          NB: <b>.jpg</b> or <b>.png</b> is accept
        </p>

        <input
          type="file"
          name="photo"
          id="photo"
          onChange={handleUploadPhoto}
          accept="image/png, image/jpeg"
          className="w-[90%] md:w-[50%] h-full px-2 py-1 mx-5 rounded-md bg-slate-700"
          // value={userInfo.photo}
        />

        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          value={userInfo.username}
          onChange={handleInputChange}
          className="w-[90%] md:w-[50%] px-2 py-2 bg-slate-700 focus:ring focus:ring-cyan-500 outline-none rounded-md mx-[5%]"
        />

        <input
          type="email"
          name="email"
          id="email"
          value={userInfo.email}
          onChange={handleInputChange}
          autoComplete="current-email"
          className="w-[90%] md:w-[50%] px-2 py-2 bg-slate-700 focus:ring focus:ring-cyan-500 outline-none rounded-md mx-[5%]"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="current-password"
          onChange={handleInputChange}
          // value={currentUser.email}
          className="w-[90%] md:w-[50%] px-2 py-2 bg-slate-700 focus:ring focus:ring-cyan-500 outline-none rounded-md mx-[5%]"
        />
        <button
          type="submit"
          className="w-[90%] md:w-[50%] px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:bg-cyan-600 mb-3"
        >
          Update Profile
        </button>

        {currentUser.role === "admin" && (
          <button
            type="submit"
            className="w-[90%] md:w-[50%] px-4 py-2 text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-md hover:bg-orange-600 mb-3"
          >
            <Link to="/dashboard/create-post" className="block w-full">
              Create a post
            </Link>
          </button>
        )}

        <div className="flex items-center justify-between gap-20 md:gap-[250px]">
          <span
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </span>
          <span
            className="px-4 py-2 text-white bg-red-800 rounded-md cursor-pointer hover:bg-red-600"
            onClick={handleLogout}
          >
            Sign Out
          </span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
