// import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchPost from "../components/SearchPost";
import axios from "axios";
import { api } from "../utils/api";

const Search = () => {
  const { term } = useParams();
  const [searchTerm, setSearchTerm] = useState(term === "all" ? "" : term);
  const [posts, setPosts] = useState([]);
  const [filtering, setFiltering] = useState(term === "all" ? "" : term);

  console.log(filtering);

  useEffect(() => {
    const getPosts = async () => {
      let posts;
      const response = await axios.get(api.getPosts);
      // console.log(response);
      if (response.data.success && !searchTerm) {
        posts = response?.data.data;
        setPosts(posts);
      }
      if (response.data.success && searchTerm) {
        posts = response?.data.data;
        posts = posts.filter((post) =>
          post.category.includes(searchTerm.toLowerCase())
        );
        setPosts(posts);
      }
    };
    getPosts();
  }, [searchTerm, filtering]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-[20%] md:shadow-md shadow-blue-500 md:h-screen flex flex-col justify-center md:border-r border-blue-500 pt-16">
        <div className="grid grid-cols-2 gap-2 p-5 bg-black md:grid-cols-1">
          {/* searchItem */}
          <form className="my-5">
            <label htmlFor="searchItem">Term</label>
            <input
              className="w-full px-4 bg-black border-2 rounded-md"
              type="text"
              name="searchItem"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* filterBy */}
          <form className="mb-5">
            <label htmlFor="filterBy">Filter By Category</label>
            <select
              className="w-full px-4 bg-black border-2 rounded-md"
              name="filterBy"
              onChange={(e) =>
                setFiltering(e.target.value) & searchTerm(e.target.value)
              }
              value={filtering}
            >
              <option value="">Select</option>
              <option value="ecommerce">Ecommerce</option>
              <option value="blog">Blog</option>
              <option value="portfolio">Portfolio</option>
            </select>
          </form>

          {/* sortBy */}
          <div>
            <label htmlFor="sortBy">Sort By</label>
            <select
              className="w-full px-4 bg-black border-2 rounded-md"
              name="sortBy"
            >
              <option value="">Select</option>
              <option value="recent">Desc</option>
              <option value="oldest">Asc</option>
            </select>
          </div>
        </div>
      </div>
      {/*... */}
      <div className="md:w-[80%] grid md:grid-cols-2 gap-5 px-5 py-5 md:pt-20">
        {posts.map((post) => (
          <SearchPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Search;
