import { toast } from "react-toastify";
import { Auth, signupState } from "../../type";
import * as httpRequest from "../../utils/httpRequest";

export const loginPass = async (params: Auth) => {
    try {
        const res = await httpRequest.post("/auth/employee/login", {
            username: params.username,
            password: params.password,
        });
        return res;
    } catch (error: any) {
        if (error?.response?.data?.error?.errorCode === 13) {
            error?.response?.data?.devResponse?.details?.map((err: any) => (
                toast.error(err?.field + " " + err?.validate)
            ))
        }
        toast.error(error?.response?.data?.error?.errorMessage)
        return Promise.reject(error);
    }
};

export const logout = async () => {
    try {
        const res = await httpRequest.post("/auth/employee/logout");
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logoutUser = async (fcmTokenId: string) => {
    try {
        const res = await httpRequest.post("/auth/user/logout",
            { fcmTokenId }
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const signup = async (params: signupState) => {
    try {
        const res = await httpRequest.post("/user/register", {
            username: params.username,
            email: params.email,
            password: params.password,
            full_name: params.full_name,
        });

        return res?.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const test = async () => {
    try {
        const res = await httpRequest.get("/user/listServerOfUser");
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const forgetPassword = async (email: string) => {
    try {
        const res = await httpRequest.post("/user/forgetpassword", {
            email: email,
        });
        return res;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const resetPassword = async (newPass: string, token: string) => {
    try {
        const res = await httpRequest.post("/user/reset-password", {
            newPassword: newPass,
            token: token,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const changePassword = async (username: string, password: string) => {
    try {
        const res = await httpRequest.post("/user/change-password", {
            username: username,
            password: password,
        });
        return res;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
