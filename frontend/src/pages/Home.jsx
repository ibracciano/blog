import { Link, useNavigate } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import RelatedPostCard from "../components/RelatedPostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../utils/api";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export default function Home() {
  const navigate = useNavigate();
  const term = "all";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(api.getPosts);
      if (response.data.success) {
        setPosts(response.data.data);
      }
    };
    getPosts();
  }, []);

  const handleNavigate = () => {
    navigate(`/search/${term}`);
    // window.location.href = `/search/${term}`;
  };
  return (
    <div>
      <div
        data-aos="fade-right"
        data-aos-delay="50"
        data-aos-duration="1000"
        className="flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28 "
      >
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <button
          onClick={handleNavigate}
          className="text-xs font-bold text-teal-500 text-start sm:text-sm hover:underline"
        >
          View all posts
        </button>
      </div>
      <div
        data-aos="flip-left"
        data-aos-delay="50"
        data-aos-duration="1000"
        className="p-3 bg-amber-100 dark:bg-slate-700"
      >
        <CallToAction />
      </div>

      <div className="flex flex-col gap-8 p-3 mx-auto py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="grid grid-cols-1 gap-5 mx-auto md:grid-cols-3">
              {posts.map((post) => (
                <RelatedPostCard key={post._id} post={post} />
              ))}
            </div>
            <button
              className="text-lg text-center text-teal-500 hover:underline"
              onClick={handleNavigate}
            >
              View all posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
