import axios from "axios";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Table } from "flowbite-react";
import { MdEdit } from "react-icons/md";

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
    <div className="px-2 overflow-x-auto pt-[250px] md:pt-20">
      <Table>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="text-white divide-y">
          {users.map((user) => (
            <Table.Row key={user._id} className="bg-gray-800 border-gray-700">
              <Table.Cell className="font-medium whitespace-nowrap ">
                {moment(user.createdAt).format("LL")}
              </Table.Cell>
              <Table.Cell>
                <img
                  src={user.photo}
                  alt=""
                  className="block w-12 rounded-md md:w-10 md:h-10"
                />
              </Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                {user.role === "admin" ? (
                  <span className="p-1 bg-gray-700 rounded-md">
                    {user.role}
                  </span>
                ) : (
                  <span className="p-1 bg-gray-700 rounded-md">
                    {user.role}
                  </span>
                )}
              </Table.Cell>
              <Table.Cell
                onClick={() => handleDeleteUser(user._id)}
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

export default AllUsers;
{
  /* <SingleUser key={user._id} user={user} /> */
}
