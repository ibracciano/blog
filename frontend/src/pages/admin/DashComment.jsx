import axios from "axios";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Pagination, Table } from "flowbite-react";

const DashComment = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(comments.length / 6));

  const onPageChange = (page) => setCurrentPage(page);
  // console.log(currentPage);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${api.getComments}?page=${currentPage}`
      );
      // console.log(response);
      if (response.data.success) {
        setComments(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getComments();
  }, [currentPage]);
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
    <div className="overflow-x-auto px-2 pt-[250px] md:pt-20">
      <Table>
        <Table.Head>
          <Table.HeadCell>Updated At</Table.HeadCell>
          <Table.HeadCell>Content</Table.HeadCell>
          <Table.HeadCell>Number of Likes</Table.HeadCell>
          <Table.HeadCell>PostId</Table.HeadCell>
          <Table.HeadCell>UserId</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="text-white divide-y">
          {comments.map((comment) => (
            <Table.Row
              key={comment._id}
              className="bg-gray-800 border-gray-700"
            >
              <Table.Cell className="font-medium whitespace-nowrap ">
                {moment(comment.createdAt).format("LL")}
              </Table.Cell>
              <Table.Cell>{comment.content}</Table.Cell>
              <Table.Cell>{comment.numberOfLikes}</Table.Cell>
              <Table.Cell>{comment.postId}</Table.Cell>
              <Table.Cell>{comment.userId}</Table.Cell>
              <Table.Cell>
                <CiCircleRemove
                  size={20}
                  className="w-5 h-5 p-1 text-red-500 rounded-full md:w-8 md:h-8"
                  onClick={() => handleDeleteComment(comment._id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex justify-center mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default DashComment;
{
  /* <SingleUser key={user._id} user={user} /> */
}
