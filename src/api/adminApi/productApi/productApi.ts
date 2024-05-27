import * as httpRequest from "../../../utils/httpRequest";

export const addProduct = async (formData: FormData, type: string) => {
    try {
        const res = await httpRequest.post(`/product?product_type=${type}`, formData, {
            "Content-Type": "multipart/form-data",
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addFileProduct = async (formData: FormData, type: string) => {
    try {
        const res = await httpRequest.post(`/product/import?product_type=${type}`, formData, {
            "Content-Type": "multipart/form-data",
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllProduct = async (
    key?: string,
    pageCurrent?: number,
    productStatus?: string,
    categoryId?: string,
    branchId?: string
) => {
    try {
        const res = await httpRequest.get(
            `/product?page=${pageCurrent}&size=10${productStatus !== "" ? `&product_status=${productStatus}` : ""
            }${key !== "" ? `&key=${key}` : ""}${categoryId !== "" ? `&categoryId=${categoryId}` : ""
            }${branchId ? `&branch_id=${branchId}` : ""}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const searchProduct = async (
    key?: string,
    pageCurrent?: number,
    productStatus?: string,
    categoryId?: string
) => {
    try {
        const res = await httpRequest.get(
            `/product?page=${pageCurrent}&size=9999${productStatus !== "" ? `&productStatus=${productStatus}` : ""
            }${key !== "" ? `&key=${key}` : ""}${categoryId !== "" ? `&categoryId=${categoryId}` : ""
            } `
        );
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

export const updateProduct = async (formData: FormData, ProductId: string, type: string) => {
    try {
        const res = await httpRequest.put(`/product/${ProductId}?product_type=${type}`, formData, {
            "Content-Type": "multipart/form-data",
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateStatusBranchProduct = async (productId: string, branchId: string, branch_product_status: string) => {
    try {
        const res = await httpRequest.patch(`/product/${productId}/branch/${branchId}?branch_product_status=${branch_product_status}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getProductById = async (productId: string) => {
    try {
        const res = await httpRequest.get(`/product/${productId}/details`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getReviewProduct = async (productId: string, currentPage: number, size: number) => {
    try {
        const res = await httpRequest.get(`/review/product/${productId}?page=${currentPage}&size=${size}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getStatisticProduct = async (productId: string) => {
    try {
        const res = await httpRequest.get(`/review/statistic/product/${productId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
