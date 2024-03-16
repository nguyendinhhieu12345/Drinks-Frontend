import * as httpRequest from "../../../utils/httpRequest";

export const getAllOrder = async (
  key?: string,
  pageCurrent?: number,
  orderStatus?: string
) => {
  try {
    const res = await httpRequest.get(
      `/order?page=${pageCurrent}&size=10${
        orderStatus !== "" ? `&status=${orderStatus}` : ""
      }${key !== "" ? `&key=${key}` : ""} `
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const res = await httpRequest.get(`/order/${orderId}/details`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
