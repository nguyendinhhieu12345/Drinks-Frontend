import * as httpRequest from "../../../utils/httpRequest";

export const getAllAddress = async () => {
  try {
    const res = await httpRequest.get(
      `https://provinces.open-api.vn/api/?depth=3`
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
