import { useNavigate } from "react-router-dom";

const RelatedPostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/post/${item.slug}`, { state: { item: item } });
  };

  //   console.log(post);
  return (
    <div className="group relative w-full border bg-black border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <div onClick={() => handleNavigate(post)}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="text-sm italic">category : {post.category}</span>
        <p
          onClick={() => handleNavigate(post)}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 cursor-pointer"
        >
          Read article
        </p>
      </div>
    </div>
  );
};

export default RelatedPostCard;
