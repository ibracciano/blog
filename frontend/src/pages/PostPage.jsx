// import React from 'react'

import moment from "moment";
import { useLocation } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import RelatedPostCard from "../components/RelatedPostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../utils/api";

const PostPage = () => {
  const location = useLocation();
  const { item } = location.state;
  //   console.log(item);

  const [relatedPosts, setRelatedPosts] = useState([]);
  // fetch related posts
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await axios.get(
          `${api.getRelatedPosts}?exclude=${item._id}&limit=3`
        );
        //   console.log(response.data);
        if (response.data.success) {
          setRelatedPosts(response.data.data);
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchRelatedPosts();
  }, [item._id]);

  return (
    <main className="p-3 pt-20">
      <h1
        data-aos="fade-left"
        data-aos-duration="1000"
        className="max-w-2xl mx-auto mt-10 text-3xl font-bold text-center lg:text-4xl"
      >
        {item.title}
      </h1>
      <p className="flex items-center justify-center mt-2 mb-5 text-center">
        <button className="w-20 py-2 bg-gray-700 rounded-full">
          {item.category}
        </button>
      </p>
      <div
        data-aos="zoom-out-up"
        data-aos-duration="1000"
        className=" max-h-[600px] md:w-[60%] mx-auto"
      >
        <img
          src={item.image}
          alt=""
          className="max-h-[400px] w-full object-cover rounded-md"
        />
      </div>

      <p className="flex justify-between md:w-[60%] py-3 mx-auto mt-2 text-xs border-b border-slate-500">
        <span>{moment(item.createdAt).format("LL")}</span>
        <span>{(item.content.length / 1000).toFixed(0)} mins read</span>
      </p>

      <div
        dangerouslySetInnerHTML={{ __html: item.content }}
        className="my-5 md:w-[60%] mx-auto post-content"
      ></div>

      <div className="w-full max-w-4xl mx-auto">
        <CallToAction />
      </div>
      <CommentSection postId={item._id} />

      <div className="flex flex-col items-center justify-center mb-5 ">
        <h1 className="mt-5 text-xl">Related Posts</h1>
        <div className="flex flex-wrap justify-center gap-5 mt-5 ">
          {relatedPosts &&
            relatedPosts.map((post) => (
              <RelatedPostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
