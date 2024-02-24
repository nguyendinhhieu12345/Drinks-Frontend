import * as httpRequest from "../../../utils/httpRequest";

export const addCategory = async (formData: FormData) => {
  try {
    const res = await httpRequest.post(`/category`, formData, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCategory = async () => {
  try {
    const res = await httpRequest.get(`/category`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
