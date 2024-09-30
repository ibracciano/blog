import axios from "axios";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DashComment = () => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const response = await axios.get(api.getComments);
      //   console.log(response.data);
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);
  // console.log(comments);

  const handleDeleteComment = async (id) => {
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
          text: "User has been deleted.",
          icon: "success",
        });
        try {
          const response = await axios.delete(`${api.deleteComment}/${id}`);
          console.log(response);

          if (response.data.success) {
            toast.success(response.data.message);
            window.location.reload();
          }
        } catch (error) {
          toast.error(error.response.data.message);
          console.error(error.response.data.message);
        }
      }
    });
  };

  return (
    <div className="px-2 pt-[200px] md:pt-20">
      {/* <div className="">
        {users.map((user) => (
          <SingleUser key={user._id} user={user} />
        ))}
      </div> */}
      <table className="w-full md:w-full text-[5px] md:text-sm">
        <thead className="rounded-md bg-slate-700">
          <tr>
            <th>Updated At</th>
            <th>Content</th>
            <th>Number of Likes</th>
            <th>PostId</th>
            <th>UserId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-black">
          {comments.map((comment) => (
            <tr className="text-center" key={comment._id}>
              <td>{moment(comment.updatedAt).format("LL")}</td>
              <td>{comment.content}</td>
              <td>{comment.numberOfLikes}</td>
              <td>{comment.postId}</td>
              <td className="text-center">{comment.userId}</td>
              <td
                className="flex items-center justify-center cursor-pointer"
                onClick={() => handleDeleteComment(comment._id)}
              >
                <CiCircleRemove
                  size={20}
                  className="w-5 h-5 p-1 rounded-full bg-cyan-600 md:w-8 md:h-8"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashComment;
{
  /* <SingleUser key={user._id} user={user} /> */
}
