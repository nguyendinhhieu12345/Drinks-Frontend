import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { HandWaving } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import assets from "@/assets";
import { configRouter } from "@/configs/router";
import FromWrap from "@/components/FormWrap/FromWrap";
import InputWrap from "@/components/FormWrap/InputWrap";
import { Auth } from "@/type";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        document.title = "Shopfee | login";
    }, []);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        const auth: Auth = { username: email, password: password };
        const loginSuccess = await dispatch(login(auth));

        if (loginSuccess.type === "auth/login/fulfilled") {
            navigate(configRouter.dashboardAdmin)
        }
        setLoading(false);
    };

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
                            Enter your account credentials to view your orders
                        </p>
                    </div>

                    <div>
                        <FromWrap
                            defaultValues={{ email: "", password: "" }}
                            onSubmit={(values) =>
                                handleLogin(
                                    (values as { password: string; email: string }).email,
                                    (values as { password: string; email: string }).password
                                )
                            }
                        >
                            <div className="mb-5">
                                <p className="font-semibold text-base">Email</p>
                                <InputWrap
                                    formField={{ name: "email" }}
                                    className="border-2 border-gray-500 rounded-md w-90 h-10 pl-3 hover:border-blue-500"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-base">Password</p>
                                <InputWrap
                                    formField={{ name: "password" }}
                                    type="password"
                                    className="border-2 border-gray-500 rounded-md w-90 h-10 pl-3 pr-3 hover:border-blue-500"
                                />
                            </div>
                            <div className="flex space-x-5 mt-10">
                                <button
                                    type="submit"
                                    className="w-90 h-10 text-white rounded-lg bg-[#5D4037] opacity-80 hover:opacity-100 active:opacity-100 focus:opacity-100"
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
                                    Login
                                </button>
                            </div>
                        </FromWrap>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
