// import React from 'react'
import axios from "axios";
import moment from "moment";
import { CiCircleRemove } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

const SinglePost = ({ posts }) => {
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    navigate(`/post/${item.slug}`, { state: { item: item } });
  };
  const handleEditPost = (item) => {
    navigate(`/dashboard/update-post/${item._id}`, { state: { item: item } });
  };

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
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body className="text-white divide-y">
          {posts.map((post) => (
            <Table.Row key={post._id} className="bg-gray-800 border-gray-700">
              <Table.Cell className="font-medium whitespace-nowrap ">
                {moment(post.createdAt).format("LL")}
              </Table.Cell>
              <Table.Cell>
                <img
                  src={post.image}
                  alt=""
                  className="block w-12 rounded-md md:w-20 md:h-10"
                />
              </Table.Cell>
              <Table.Cell
                className="cursor-pointer"
                onClick={() => handleNavigate(post)}
              >
                {post.title}
              </Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
              <Table.Cell
                onClick={() => handleEditPost(post)}
                className="cursor-pointer"
              >
                <MdEdit
                  size={20}
                  className="p-1 text-teal-300 rounded-full md:w-8 md:h-8"
                />
              </Table.Cell>
              <Table.Cell
                onClick={() => handleDeletePost(post)}
                className="cursor-pointer"
              >
                <CiCircleRemove
                  size={20}
                  className="p-1 text-red-500 rounded-full md:w-8 md:h-8"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SinglePost;
