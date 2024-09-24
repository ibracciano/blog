import axios from "axios";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(api.getUsers);
      //   console.log(response.data);
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  // console.log(posts);

  const handleDeleteUser = async (id) => {
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
          const response = await axios.post(api.deleteUser, { id: id });
          console.log(response);

          if (response.data.success) {
            toast.success(response.data.message);
            // window.location.reload();
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
            <th>Date</th>
            <th>Image</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-black">
          {users.map((user) => (
            <tr className="text-center" key={user._id}>
              <td>{moment(user.createdAt).format("LL")}</td>
              <td>
                <img
                  src={user.photo}
                  alt=""
                  className="w-5 h-5 rounded-full md:w-10 md:h-10 mx-[20%] md:mx-[20%]"
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="text-center">
                {user.role === "admin" ? (
                  <span className="p-1 bg-gray-700 rounded-md">
                    {user.role}
                  </span>
                ) : (
                  <span className="p-1 bg-gray-700 rounded-md">
                    {user.role}
                  </span>
                )}
              </td>
              <td
                className="flex items-center justify-center cursor-pointer"
                onClick={() => handleDeleteUser(user._id)}
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

export default AllUsers;
{
  /* <SingleUser key={user._id} user={user} /> */
}
