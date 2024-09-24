// import React from 'react'

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3 text-center border border-teal-500 sm:flex-row rounded-tl-3xl rounded-br-3xl">
      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="my-2 text-gray-500">
          Checkout these resources with 100 JavaScript Projects
        </p>
        <button className="py-2 rounded-bl-none rounded-tl-xl bg-gradient-to-r from-pink-500 to-rose-500">
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 JavaScript Projects
          </a>
        </button>
      </div>
      <div className="flex-1 p-7">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  );
};

export default CallToAction;
