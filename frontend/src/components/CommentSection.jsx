// import React from 'react'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../utils/api";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

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

  const getCommentPost = async () => {
    try {
      const response = await axios.get(`${api.getCommentSinglePost}/${postId}`);
      //   console.log(response.data);
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCommentPost();
  }, [postId]);

  const handleLike = async (commentId) => {
    console.log(commentId);
    try {
      const response = await axios.put(`${api.putLikeComment}/${commentId}`);
      // console.log(response);
      if (response.data.success) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: response.data.data }
              : comment
          )
        );
      }
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
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

        {comments.length === 0 ? (
          <p className="my-5 text-sm">No comments yet!</p>
        ) : (
          <>
            <div className="flex items-center gap-1 my-5 text-sm">
              <p>Comments</p>
              <div className="px-2 py-1 border border-gray-400 rounded-sm">
                <p>{comments.length}</p>
              </div>
            </div>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                // onDelete={(commentId) => {
                //   setShowModal(true);
                //   setCommentToDelete(commentId);
                // }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
