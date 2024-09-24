// import React from 'react'

import moment from "moment";
import { useLocation } from "react-router-dom";

const PostPage = () => {
  const location = useLocation();
  const { item } = location.state;
  //   console.log(item);

  return (
    <main className="p-3 pt-20">
      <h1 className="max-w-2xl mx-auto mt-10 text-3xl font-bold text-center lg:text-4xl">
        {item.title}
      </h1>
      <p className="flex items-center justify-center mt-2 mb-5 text-center">
        <button className="w-20 py-2 bg-gray-700 rounded-full">
          {item.category}
        </button>
      </p>
      <div className=" max-h-[600px] md:w-[60%] mx-auto">
        <img
          src={item.image}
          alt=""
          className="max-h-[400px] w-full object-cover rounded-md"
        />
      </div>

      <p className="flex justify-between md:w-[60%] py-3 mx-auto mt-2 text-xs border-b border-slate-500">
        <span>{moment(item.createdAt).format("LL")}</span>
        <span>{(item.content.length / 1000).toFixed(0)} mins read</span>
      </p>

      <div
        dangerouslySetInnerHTML={{ __html: item.content }}
        className="my-5 md:w-[60%] mx-auto post-content"
      ></div>
    </main>
  );
};

export default PostPage;
