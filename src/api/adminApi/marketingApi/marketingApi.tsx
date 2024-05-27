import * as httpRequest from "../../../utils/httpRequest";

export const addBlog = async (formData: FormData) => {
    try {
        const res = await httpRequest.post(`/blog`, formData, {
            "Content-Type": "multipart/form-data",
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const editBlog = async (formData: FormData, blogId: string) => {
    try {
        const res = await httpRequest.put(`/blog/${blogId}`, formData, {
            "Content-Type": "multipart/form-data",
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllBlog = async (
    pageCurrent?: number,
    blogStatus?: string,
) => {
    try {
        const res = await httpRequest.get(
            `/blog/list?page=${pageCurrent}&size=10${blogStatus ? `&status=${blogStatus}` : ""}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllBlogById = async (
    blogId: string
) => {
    try {
        const res = await httpRequest.get(
            `/blog/${blogId}/details`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteBlog = async (blogId: string) => {
    try {
        const res = await httpRequest.deleted(`/blog/${blogId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};