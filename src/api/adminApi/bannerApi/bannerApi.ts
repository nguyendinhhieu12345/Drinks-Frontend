import * as httpRequest from "../../../utils/httpRequest";

export const addBanner = async (newBanner: FormData) => {
  try {
    const res = await httpRequest.post(`/banner`, newBanner, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllBanner = async () => {
  try {
    const res = await httpRequest.get(`/banner`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBanner = async (bannerId: string) => {
  try {
    const res = await httpRequest.deleted(`/banner/${bannerId}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBanner = async (newBanner: FormData, bannerId: string) => {
  try {
    const res = await httpRequest.put(`/banner/${bannerId}`, newBanner, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};