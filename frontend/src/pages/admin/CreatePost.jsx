// import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="w-full pt-24 pb-40 md:pt-24">
      <div className="flex flex-col px-4">
        <h1 className="mb-2 text-xl text-center md:text-3xl">Create a Post</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-2 md:flex-row">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 rounded-md bg-slate-700 focus:outline-none focus:border-cyan-500"
            />
            <select
              name="category"
              id="category"
              className="w-full md:w-[40%] py-2 rounded-md bg-slate-700"
            >
              <option value="">Select a category</option>
              <option value="tech">Tech</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <div className="flex flex-col justify-between w-full gap-2 px-2 py-2 border-2 border-dashed md:flex-row border-cyan-600">
            <input
              type="file"
              name="blogPhoto"
              id="blogPhoto"
              className="py-1 rounded-md bg-slate-700"
              required
            />

            <button className="p-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-cyan-700">
              Upload image
            </button>
          </div>
          <ReactQuill
            theme="snow"
            placeholder="Write content here..."
            className="w-full mt-2 text-white h-72"
          />
          <button
            type="submit"
            className="w-full py-2 mt-16 rounded-md md:mt-10 bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-2 focus:ring-white"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
