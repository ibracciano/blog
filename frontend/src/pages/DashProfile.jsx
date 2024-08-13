// import React from 'react'

import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <main className="w-full pt-5 pb-40 md:pt-24">
      <h1 className="mb-2 text-xl text-center md:text-3xl">My Profile</h1>
      <form className="flex flex-col items-center justify-center md:mt-10">
        <img
          src={currentUser.photo}
          alt="profile-photo"
          className="w-20 h-20 border-4 rounded-full md:w-28 md:h-28 border-cyan-500 md:mb-10"
        />
        <div className="my-5 space-y-4">
          <input
            type="text"
            name="username"
            id="username"
            value={currentUser.username}
            className="w-[90%] px-2 py-2 bg-slate-700 focus:ring focus:ring-cyan-500 outline-none rounded-md mx-[5%]"
          />

          <input
            type="email"
            name="email"
            id="email"
            value={currentUser.email}
            className="w-[90%] px-2 py-2 bg-slate-700 focus:ring focus:ring-cyan-500 outline-none rounded-md mx-[5%]"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            // value={currentUser.email}
            className="w-[90%] px-2 py-2 bg-slate-700 focus:ring focus:ring-cyan-500 outline-none rounded-md mx-[5%]"
          />
        </div>
        <button
          type="submit"
          className="w-[90%] md:w-[50%] px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 mb-3"
        >
          Update Profile
        </button>

        <button
          type="button"
          className="w-[90%] md:w-[50%] px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete Account
        </button>
      </form>
    </main>
  );
};

export default DashProfile;
