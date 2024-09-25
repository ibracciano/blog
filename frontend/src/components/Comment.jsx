// import React from 'react'
import moment from "moment";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { toast } from "react-toastify";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  //   console.log(comment);
  //   const { onLike } = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  // const [numberOfLikes, setNumberOfLikes] = useState(comment.numberOfLikes);
  const { userId } = comment;

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${api.putEditComment}/${comment._id}`,

        {
          content: editedContent,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center p-4 text-sm border-b">
      <div className="flex-shrink-0 mr-3">
        <img
          src={userId.photo}
          alt={userId.username}
          className="w-10 h-10 bg-gray-700 rounded-full"
        />
      </div>

      <div>
        <div className="flex items-center">
          <span className="mr-1 font-bold text-teal-500 truncate">
            {userId ? `@${userId.username}` : "anonymous user"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className="w-full px-3 py-1 mb-2 bg-black"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                className="p-1 rounded-md bg-gradient-to-r from-pink-500 to-rose-500"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                size="sm"
                className="p-1 rounded-md bg-gradient-to-r from-pink-500 to-rose-500"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="pb-2 text-gray-500">{comment.content}</p>
            <div className="flex items-center gap-2 pt-2 text-xs border-t dark:border-gray-700 max-w-fit">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId ||
                  currentUser.role === "admin") && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="p-1 text-gray-400 rounded-md hover:text-white bg-gradient-to-r from-pink-500 to-rose-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="p-1 text-gray-400 rounded-md hover:text-white bg-gradient-to-r from-pink-500 to-rose-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
