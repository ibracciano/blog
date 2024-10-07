import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../firebase/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        // console.log(res);
        const user = res.user;

        const newUser = {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isVerify: user.emailVerified,
          lastLogin: user.metadata.lastLoginAt,
        };
        // console.log(newUser);

        await axios
          .post("http://localhost:3000/api/user/google", newUser)
          .then((response) => {
            // console.log(response.data);
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(loginUser(response.data.data));
              setTimeout(() => {
                navigate("/");
              }, 1000);
            }
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
          });
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div>
      {/* google button */}
      <button
        className="flex items-center justify-center w-full gap-2 p-2 mt-5 rounded-md outline hover:bg-gradient-to-r from-cyan-500 to-blue-500"
        onClick={signIn}
      >
        <FcGoogle size={30} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Google;
