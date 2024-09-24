// import React from 'react'
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../utils/uploadImage";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;
  //   console.log(item);
  const [photo, setPhoto] = useState(null);
  const [post, setPost] = useState({
    title: item.title,
    content: item.content,
    category: item.category,
    image: item.image || null,
  });

  const handleImageChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  // upload de photo
  const handleUploadImage = async () => {
    const file = photo;
    // console.log(file);
    if (!file) {
      toast.error("image was not uploaded");
    }
    const uploadImageCloudinary = await uploadImage(file);
    // console.log(uploadImageCloudinary);
    setPost({ ...post, image: uploadImageCloudinary.secure_url });
  };

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (
      post.title === "" ||
      post.content === "" ||
      post.category === "" ||
      post.image === null
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axios.put(`${api.updatePost}/${item._id}`, post);
      // console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setPost({ title: "", content: "", category: "", image: null });
        setPhoto(null);
        navigate("/dashboard/all-posts");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full pb-40 pt-28 md:pt-24">
      <div className="flex flex-col px-4">
        <h1 className="mb-2 text-xl text-center md:text-3xl">Update a Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitPost}>
          <div className="flex flex-col w-full gap-2 md:flex-row">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={post.title}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-slate-700 focus:outline-none focus:border-cyan-500"
            />
            <select
              name="category"
              id="category"
              required
              value={post.category}
              onChange={handleInputChange}
              className="w-full md:w-[40%] p-2 rounded-md bg-slate-700"
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
              name="image"
              id="image"
              onChange={handleImageChange}
              className="py-1 rounded-md bg-slate-700"
            />

            <p
              className="p-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-cyan-700"
              onClick={handleUploadImage}
            >
              Upload image
            </p>
          </div>
          {post.image && (
            <div>
              <img src={post.image} alt="" />
            </div>
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write content here..."
            className="w-full mt-2 text-white h-72"
            value={post.content}
            required
            onChange={(value) => setPost({ ...post, content: value })}
          />
          <button
            type="submit"
            className="w-full py-2 mt-16 rounded-md md:mt-10 bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-2 focus:ring-white"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
