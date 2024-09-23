// import React from 'react'
import axios from "axios";
import moment from "moment";
import { CiCircleRemove } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SinglePost = ({ post }) => {
  // const handleDeletePost = async (idPost) => {
  //   try {
  //     const response = await axios.post(api.deletePost, { idPost });
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // console.error(error.response.data.message);
  //   }
  // };

  const handleDeletePost = async (idPost) => {
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
          text: "Post has been deleted.",
          icon: "success",
        });
        try {
          const response = await axios.post(api.deletePost, {
            idPost,
          });

          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error) {
          console.error(error.response.data.message);
        }
      }
    });
  };

  return (
    <div className="grid max-w-md grid-cols-5 grid-flow-col px-5 py-3 text-center bg-black rounded-md md:max-w-6xl text-[10px] md:text-sm">
      <p className="flex items-center justify-center">
        {moment(post.createdAt).format("LL")}
      </p>
      <p className="flex items-center justify-center">
        <img
          src={post.image}
          alt=""
          className="block w-12 rounded-md md:w-20 md:h-10"
        />
      </p>
      <p className="flex items-center justify-center">{post.title}</p>
      <p className="flex items-center justify-center">{post.category}</p>
      <p className="flex items-center justify-center">
        <MdEdit
          size={10}
          className="w-5 h-5 p-1 bg-teal-300 rounded-full md:w-8 md:h-8"
        />
      </p>
      <p
        className="flex items-center justify-center"
        onClick={() => handleDeletePost(post._id)}
      >
        <CiCircleRemove
          size={20}
          className="w-5 h-5 p-1 bg-red-600 rounded-full md:w-8 md:h-8"
        />
      </p>
    </div>
  );
};

export default SinglePost;
