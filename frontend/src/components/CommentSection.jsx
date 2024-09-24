// import React from 'react'

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../utils/api";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      toast.error("Please enter a comment.");
      return;
    }
    if (comment.length > 200) {
      toast.error("Comment must be less than 200 characters.");
      return;
    }
    try {
      const response = await axios.post(api.addComment, {
        postId,
        content: comment,
      });
      if (response.data.success) {
        toast.success("Comment added successfully.");
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-full max-w-2xl p-3 mx-auto">
        {currentUser ? (
          <div className="flex items-center gap-1 my-5 text-sm text-gray-500">
            <p>Signed in as:</p>
            <img
              className="object-cover w-5 h-5 rounded-full"
              src={currentUser.photo}
              alt=""
            />
            <Link
              to={`/dashboard/profile/${currentUser.username}`}
              className="text-xs text-cyan-600 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div className="flex gap-1 my-5 text-sm text-teal-500">
            You must be signed in to comment.
            <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
              Sign In
            </Link>
          </div>
        )}

        {currentUser && (
          <form
            onSubmit={handleSubmit}
            className="p-3 border border-teal-500 rounded-md"
          >
            <textarea
              placeholder="Add a comment..."
              className="w-full px-3 py-2 bg-black rounded-md outline-none focus:ring-1 ring-teal-500"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />

            <div className="flex items-center justify-between mt-5">
              <p className="text-xs text-gray-500">
                {200 - comment.length} characters remaining
              </p>
              <button
                type="submit"
                className="p-1 rounded-md bg-gradient-to-r from-pink-500 to-rose-500"
              >
                Submit
              </button>
            </div>
            {/* {commentError && (
              <Alert color="failure" className="mt-5">
                {commentError}
              </Alert>
            )} */}
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
