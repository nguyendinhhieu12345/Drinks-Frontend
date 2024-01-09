import { Auth, signupState } from "../../type";
import * as httpRequest from "../../utils/httpRequest";

export const loginPass = async (params: Auth) => {
  try {
    const res = await httpRequest.post("/user/login", {
      username: params.username,
      password: params.password,
    });
    return res?.data;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error?.response?.data);
  }
};
export const signup = async (params: signupState) => {
  try {
    console.log(params);
    const res = await httpRequest.post("/user/register", {
      username: params.username,
      email: params.email,
      password: params.password,
      full_name: params.full_name,
    });

    return res?.data;
  } catch (error) {
    console.log(error);

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

export const logout = async () => {
  try {
    const res = await httpRequest.post("/user/logout");
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

export const getTransactionByStudent = async (username: string) => {
  try {
    const res = await httpRequest.get(`payment/get-payment/${username}`);
    return res;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getProcessCourseByStudentId = async (student_id: string) => {
  try {
    const res = await httpRequest.get(`user/process-course/${student_id}`);
    return res;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
