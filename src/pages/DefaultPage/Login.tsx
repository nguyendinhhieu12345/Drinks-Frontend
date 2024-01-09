import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Auth } from "../../type";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Books,
  // FacebookLogo,
  // GoogleLogo,
  HandWaving,
  // LinkedinLogo,
} from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import assets from "@/assets";
import { configRouter } from "@/configs/router";
// import { IUser } from "@/types/type";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
  const notifySuccess = (message: string) => {
    toast.success(message, {
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
  const loginHandler = async () => {
    setLoading(true);
    const auth: Auth = { username: username, password: password };
    const loginSuccess = await dispatch(login(auth));

    if (loginSuccess.type === "auth/login/fulfilled") {
      notifySuccess("Đăng nhập thành công");
      // if ((loginSuccess.payload as IUser)?.role === "0") navigate("/");
      // else if ((loginSuccess.payload as IUser)?.role === "1")
      //   navigate(configRouter.dashboardTeacher);
      // else navigate(configRouter.dashboardAdmin);
    } else {
      notify((loginSuccess as { error: { message: string } }).error?.message);
    }
    setLoading(false);
  };

  const handleRedirectForgetPassword = () => {
    navigate(configRouter.forgetPassword);
  };
  return (
    <div className="flex h-[100vh]">
      <div
        className="flex-initial  w-full hidden xl:flex items-center "
        style={{
          backgroundImage: `url(${assets.images.backgroundLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-7/12 h-3/6 bg-white opacity-50 backdrop-filter backdrop-blur-sm m-auto ">
          <div className="ml-10 mt-20 w-8/12 text-2xl">
            <h1 className=" text-black font-semibold italic">
              Nền tảng kỹ thuật số cho việc học từ xa
            </h1>
            <h1 className="text-base mt-4">
              Bạn sẽ không bao giờ biết tất cả mọi thứ. Nhưng bạn sẽ biết nhiều
              hơn.
            </h1>
          </div>
        </div>
      </div>
      <div className="flex-initial w-[794px] flex flex-col  ml-[7rem] items-center  xl:items-start">
        <div className="flex mt-10 mb-10 text-2xl space-x-5 ">
          <Books size={32} /> <h1>EduConnect</h1>
        </div>

        <div className="mb-12">
          <div className="flex justify-center xl:justify-start">
            <h1 className="text-2xl">
              <strong> Hey, Chào mừng</strong>
            </h1>
            <HandWaving size={32} />
          </div>
          <p className="test-base">
            Nhập tên đăng nhập và mật khẩu để đăng nhập.
          </p>
        </div>

        <div>
          <div className="mb-5">
            <h6>Tên Đăng nhập</h6>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="border-2 border-slate-500 rounded-md w-[350px] h-[40px] pl-3"
            />
          </div>
          <div>
            <h6>Mật khẩu</h6>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-2 border-slate-500 rounded-md w-[350px] h-[40px] pl-3 pr-3"
            />
          </div>
          <div className="mt-5 flex w-[350px] items-center justify-end">
            {/* <div className="space-x-3 flex  items-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500"
                id="RememberCheck"
              />
              <label htmlFor="RememberCheck">Ghi nhớ đăng nhập</label>
            </div> */}
            <h6
              className="underline cursor-pointer "
              onClick={handleRedirectForgetPassword}
            >
              Quên mật khẩu?
            </h6>
          </div>
          <div className="flex space-x-5 mt-5">
            <button
              onClick={loginHandler}
              className="bg-gradient-to-r from-orange-500 to-blue-500 w-[170px] h-10 text-white rounded-lg"
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              <strong> Đăng nhập</strong>
            </button>
            <Link to="/signUp">
              <button className=" w-[170px] h-10 border-2 border-gray-500  rounded-lg shadow-xl">
                <strong> Đăng ký</strong>
              </button>
            </Link>
          </div>
          {/* <div className="flex flex-col w-9/12 items-center mt-10 ml-5">
            <h6>Hoặc, Đăng nhập với</h6>
            <div className="flex space-x-3 mt-2">
              <button className="button-logo">
                <FacebookLogo size={32} />
                Facebook
              </button>
              <button className=" button-logo">
                <LinkedinLogo size={32} />
                Linked
              </button>
              <button className="button-logo">
                <GoogleLogo size={32} />
                Google
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
