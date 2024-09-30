import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(api.getUsers);
        // console.log(response.data);
        if (response.data.success) {
          setUsers(response.data.data);
          setTotalUsers(response.data.data.length);
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    const getAllPosts = async () => {
      try {
        const response = await axios.get(api.getPosts);
        //   console.log(response.data);
        if (response.data.success) {
          setPosts(response.data.data);
          setTotalPosts(response.data.data.length);
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    const getAllComments = async () => {
      try {
        const response = await axios.get(api.getComments);
        //   console.log(response.data);
        if (response.data.success) {
          setComments(response.data.data);
          setTotalComments(response.data.data.length);
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    if (currentUser.role === "admin") {
      getAllUsers();
      getAllPosts();
      getAllComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 pt-24 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md bg-slate-800 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 uppercase text-md">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="p-3 text-5xl text-white bg-teal-600 rounded-full shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md bg-slate-800 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 uppercase text-md">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="p-3 text-5xl text-white bg-indigo-600 rounded-full shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md bg-slate-800 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 uppercase text-md">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="p-3 text-5xl text-white rounded-full shadow-lg bg-lime-600" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 py-3 mx-auto">
        <div className="flex flex-col w-full p-2 bg-gray-800 rounded-md shadow-md md:w-auto">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard/all-users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head className="bg-gray-900">
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.slice(0, 5).map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-gray-800 border-gray-700">
                    <Table.Cell>
                      <img
                        src={user.photo}
                        alt="user"
                        className="w-10 h-10 bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full p-2 bg-gray-800 rounded-md shadow-md md:w-auto">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard/dash-comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.slice(0, 5).map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-gray-800 border-gray-700">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full p-2 bg-gray-800 rounded-md shadow-md md:w-auto">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent posts</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard/all-posts"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.slice(0, 5).map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-gray-800 border-gray-700">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="user"
                        className="h-10 bg-gray-500 rounded-md w-14"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
