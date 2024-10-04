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

  const handleFilterChange = (e) => {
    setFiltering(e.target.value);
    setSearchTerm(e.target.value);
  };
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
  }, [searchTerm]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center pt-16 border-blue-500 md:shadow-md shadow-blue-500 md:border-r">
        <div className="grid items-center grid-cols-1 gap-2 px-5 py-5 bg-black md:px-16 md:grid-cols-2">
          {/* searchItem */}
          <form>
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
          <form>
            <label htmlFor="filterBy">Filter By Category</label>
            <select
              className="w-full px-4 bg-black border-2 rounded-md"
              name="filterBy"
              onChange={handleFilterChange}
              value={filtering}
            >
              <option value="">Select</option>
              <option value="ecommerce">Ecommerce</option>
              <option value="blog">Blog</option>
              <option value="portfolio">Portfolio</option>
            </select>
          </form>
        </div>
      </div>
      {/*... */}
      <div className="grid gap-5 px-16 py-5 md:grid-cols-2">
        {posts.map((post) => (
          <SearchPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Search;
