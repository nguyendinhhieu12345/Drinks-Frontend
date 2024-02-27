import * as httpRequest from "../../../utils/httpRequest";

export const addProduct = async (formData: FormData, type: string) => {
  try {
    const res = await httpRequest.post(`/product?type=${type}`, formData, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllProduct = async () => {
  try {
    const res = await httpRequest.get(`/product`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProduct = async (ProductId: string) => {
  try {
    const res = await httpRequest.deleted(`/product/${ProductId}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
