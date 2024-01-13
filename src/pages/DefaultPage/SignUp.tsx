import assets from "@/assets";
import { Books, HandWaving } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import bg from "../../public/bgLogin.png";
import { signup } from "../../features/auth/authSlice";
import { AppDispatch } from "../../redux/store";
import { signupState } from "../../type";
import { toast } from "react-toastify";
import { SliceState } from "@/types/type";
const SignUp = () => {
  const currentUser = useSelector((state: SliceState) => state.authSlice);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [fitPassword, setFitPassword] = useState(true);
  const full_name = "test";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const notify = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const signupHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    if (username === "" || email === "" || password === "") {
      notify("Vui lòng nhập đầy đủ thông tin");
    } else if (username.length < 6) {
      notify("Tên người dùng phải có ít nhất 6 ký tự");
    } else if (password.length < 6) {
      notify("Mật khẩu phải có ít nhất 6 ký tự");
    } else if (!emailRegex.test(email)) {
      // Check if email is valid
      notify("Email không hợp lệ");
    } else if (username.includes(" ")) {
      notify("Tên người dùng không được chứa khoảng trắng");
    } else if (password === rePassword) {
      setFitPassword(true);
      const signupValue: signupState = {
        username: username,
        email: email,
        password: password,
        full_name: full_name,
      };
      const signupStatus = await dispatch(signup(signupValue));
      if (signupStatus.type === "auth/signup/fulfilled") {
        navigate("/login");
      } else if (signupStatus.type === "auth/signup/rejected") {
        notify("Username này đã tồn tại");
      }
    } else {
      notify("Mật khẩu không khớp");
      setFitPassword(false);
    }
  };

  useEffect(() => {
    document.title = "Shopfee | signup";
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-primary bg-[url('https://th.bing.com/th/id/R.2053e0d910bb9f2594ce2482e96070ec?rik=PLO4HYTyDm52hw&pid=ImgRaw&r=0')] bg-contain bg-repeat-round">
      <div className="w-[80%] h-[80%] bg-white flex rounded-2xl shadow-2xl">
        <div className="w-[35%] h-full">
          <img
            src={assets.images.imageLogin}
            className="w-full h-full object-fill rounded-s-2xl"
          />
        </div>
        <div className="w-[65%] h-full flex-initial flex flex-col items-center justify-center">
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl">Hey, Welcome Back </h1>
              <HandWaving size={32} color="#EFC806" weight="fill" />
            </div>
            <p className="text-sm">
              Create your account credentials to view your orders
            </p>
          </div>

          <div>
            <div className="mb-5">
              <p className="font-semibold text-base">Email</p>
              <input
                type="text"
                value={username}
                // placeholder="Input your email"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="border-2 border-slate-500 rounded-md w-90 h-10 pl-3 hover:border-blue-500"
              />
            </div>
            <div>
              <p className="font-semibold text-base">Password</p>
              <input
                type="password"
                value={password}
                // placeholder="Input your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border-2 border-slate-500 rounded-md w-90 h-10 pl-3 pr-3 hover:border-blue-500"
              />
            </div>
            <div className="flex space-x-5 mt-5">
              <button className="w-90 h-10 text-white rounded-lg bg-[#5D4037] opacity-80 hover:opacity-100 active:opacity-100 focus:opacity-100">
                Login
              </button>
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-navy-500"></div>
              <p>OR</p>
              <div className="h-px flex-1 bg-gray-200 dark:bg-navy-500"></div>
            </div>
            <div className="flex space-x-2 mt-3">
              <button className="w-[50%] h-10 border border-gray-200 rounded-lg shadow-2xl flex items-center justify-center font-normal ">
                <img src={assets.images.facebookLogo} className="mr-3" />
                <p className="text-blue-500">Facebook</p>
              </button>
              <button className="w-[50%] h-10 border border-gray-200 rounded-lg shadow-2xl flex items-center justify-center font-normal">
                <img src={assets.images.googleLogo} className="mr-3" />
                <p>Google</p>
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <p className="text-sm italic">
                Don't have on account?{" "}
                <span className="text-blue-500 cursor-pointer">Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
