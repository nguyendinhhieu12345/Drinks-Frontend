import * as httpRequest from "../../../utils/httpRequest";

export const getAllUser = async (
    key?: string,
    pageCurrent?: number,
    userStatus?: string
) => {
    try {
        const res = await httpRequest.get(
            `/user?page=${pageCurrent}&size=10${userStatus !== "" ? `&status=${userStatus}` : ""
            }${key !== "" ? `&key=${key}` : ""} `
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const changeStatusUser = async (
    userId: string,
    status: string
) => {
    try {
        const res = await httpRequest.patch(
            `/user/${userId}/change-status?status=${status}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
