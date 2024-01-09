import { AxiosError } from "axios";
import * as httpRequest from "./httpRequest";
import jwtDecode from "jwt-decode";
import { Store } from "@reduxjs/toolkit";
import { logoutThunk, refetchTokenStore } from "@/features/auth/authSlice";
import { User } from "@/type";
import { AppDispatch } from "@/redux/store";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

interface IAccessToken {
  exp: number;
  iat: number;
  userId: string;
  username: string;
  role: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  phone: string;
  email: string;
  accessToken: string;
}
const getTimeNow = (): number => {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const convertedDate = new Date(formattedDate);
  return convertedDate.getTime() / 1000;
};
// api call to get access token new
const refetchToken = async () => {
  try {
    const data = await httpRequest.post("user/refreshToken", {
      headers: {
        withCredentials: true,
      },
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// interceptor setup
export const setupInterceptor = (store: Store, dispatch: AppDispatch): void => {
  let isRefreshing: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let refreshPromise: Promise<any> | null = null;
  //           isRefreshing = true;
  refreshPromise = null;
  isRefreshing = false;
  // handle request call aceess token
  httpRequest.default.interceptors.request.use(
    async (config) => {
      if (config.url?.includes("user/refreshToken")) {
        return config;
      }
      if (config.url?.includes("user/login")) {
        return config;
      }
      if (config.url?.includes("user/logout")) {
        return config;
      }

      if (config.url?.includes("user/register")) {
        return config;
      }

      if (config.url?.includes("user/forgetpassword")) {
        return config;
      }

      if (config.url?.includes("user/reset-password")) {
        return config;
      }

      const user: User = store.getState().authSlice?.currentUser;
      // store.dispatch(refetchTokenStore(accessToken));
      if (user?.accessToken) {
        const accessToken: IAccessToken = jwtDecode(user?.accessToken);
        if (accessToken?.exp < getTimeNow()) {
          if (!isRefreshing) {
            isRefreshing = true;
            if (!refreshPromise) {
              refreshPromise = refetchToken();
            }
            const data = await refreshPromise;
            const dataTemplate: User = {
              ...user,
              accessToken: data.accessToken,
            };
            dispatch(refetchTokenStore(dataTemplate));
            config.headers.Authorization = "Bearer " + data.accessToken;
            isRefreshing = false;
            refreshPromise = null;
            return config;
          }
        }
        config.headers.Authorization = "Bearer " + user.accessToken;
      }

      isRefreshing = false;
      refreshPromise = null;
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    }
  );
  httpRequest.default.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // logout system

      if (
        error.response?.status === 401 &&
        error.config?.url?.includes("user/refreshToken")
      ) {
        console.log("test");
        await dispatch(logoutThunk());
        redirect("/login");
        toast.error("Phiên đăng nhập đã hết hạn");
      }
      return Promise.reject(error);
    }
  );
};
