import { useNavigate } from "react-router-dom";

const RelatedPostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/post/${item.slug}`, { state: { item: item } });
  };

  //   console.log(post);
  return (
    <div className="group flex flex-col relative border bg-black border-teal-500 hover:border-2  h-[300px] overflow-y-hidden rounded-lg  transition-all">
      <div onClick={() => handleNavigate(post)}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[240px] w-full object-cover group-hover:h-[200px] transition-all duration-300 "
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <p className="text-xs font-semibold line-clamp-2">{post.title}</p>
        <span className="p-1 text-sm italic bg-teal-400 rounded-md">
          {post.category}
        </span>
      </div>
      <p
        onClick={() => handleNavigate(post)}
        className="group-hover:bottom-0 absolute bottom-[-200px] inset-x-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 cursor-pointer"
      >
        Read article
      </p>
    </div>
  );
};

export default RelatedPostCard;
