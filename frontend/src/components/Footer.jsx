import { IoLogoLinkedin } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-5 text-white border-t-8 border-blue-500 bg-slate-950">
      <div className="w-[90%] md:w-[80%] mx-auto">
        {/* div du haut */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1>
            <span className="p-1 text-xl font-bold rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">
              My
            </span>
            <span className="font-bold">BLOG</span>
          </h1>
          {/* social média */}
          <div className="flex items-center gap-5">
            <Link to="">
              <IoLogoLinkedin size={30} />
            </Link>
            <Link to="">
              <FaFacebook size={25} />
            </Link>

            <Link to="">
              <FaGithub size={25} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
