import axios from "axios";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import SinglePost from "../../components/SinglePost";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(api.getPosts);
      //   console.log(response.data);
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  // console.log(posts);

  return (
    <div className="px-2 pt-36 md:pt-20">
      <div className="grid grid-flow-col grid-cols-5 px-3 py-2 text-[10px] md:text-sm font-bold uppercase rounded-md bg-slate-700">
        <p className="flex items-center justify-center">Date</p>
        <p className="flex items-center justify-center">Image</p>
        <p className="flex items-center justify-center">Title</p>
        <p className="flex items-center justify-center">Category</p>
        <p className="flex items-center justify-center">Edit</p>
        <p className="flex items-center justify-center">Delete</p>
      </div>
      <div className="">
        {posts.map((post) => (
          <SinglePost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
