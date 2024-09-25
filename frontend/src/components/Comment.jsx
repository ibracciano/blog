// import React from 'react'
import moment from "moment";

const Comment = ({ comment }) => {
  console.log(comment);
  const { userId } = comment;
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
        <p className="pb-2 text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
