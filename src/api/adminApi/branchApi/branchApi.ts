import * as httpRequest from "../../../utils/httpRequest";

export const addBranch = async (newBranch: FormData) => {
  try {
    const res = await httpRequest.post(`/branch`, newBranch, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllBranch = async (page: number) => {
  try {
    const res = await httpRequest.get(`/branch?page=${page}&size=10`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBranch = async (branchId: string) => {
  try {
    const res = await httpRequest.deleted(`/branch/${branchId}`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBranch = async (newBranch: FormData, branchId: string) => {
  try {
    const res = await httpRequest.put(`/branch/${branchId}`, newBranch, {
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getBranchById = async (branchId: string) => {
  try {
    const res = await httpRequest.get(`/branch/${branchId}/detail`);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
