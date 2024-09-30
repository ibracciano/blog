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
    <div className="px-2 pt-[250px] md:pt-20">
      <SinglePost posts={posts} />
    </div>
  );
};

export default AllPosts;
