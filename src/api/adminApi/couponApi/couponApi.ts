import { ICoupon } from "@/types/type";
import * as httpRequest from "../../../utils/httpRequest";

export const addCouponShipping = async (
    couponShipping: ICoupon
) => {
    try {
        const res = await httpRequest.post(`/coupon/shipping`, couponShipping);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addCouponProduct = async (
    couponProduct: ICoupon
) => {
    try {
        const res = await httpRequest.post(`/coupon/amount-off-product`, couponProduct);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addCouponBuyXGetY = async (
    couponProduct: ICoupon
) => {
    try {
        const res = await httpRequest.post(`/coupon/product-gift`, couponProduct);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addCouponOrder = async (
    couponOrder: ICoupon
) => {
    try {
        const res = await httpRequest.post(`/coupon/order`, couponOrder);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllCoupon = async () => {
    try {
        const res = await httpRequest.get(`/coupon`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteCoupon = async (couponId: string) => {
    try {
        const res = await httpRequest.deleted(`/coupon/${couponId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const editCouponShipping = async (
    couponShipping: ICoupon,
    couponId: string
) => {
    try {
        const res = await httpRequest.put(`/coupon/shipping/${couponId}`, couponShipping);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const editCouponProduct = async (
    couponProduct: ICoupon,
    couponId: string
) => {
    try {
        const res = await httpRequest.put(`/coupon/amount-off-product/${couponId}`, couponProduct);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const editCouponBuyXGetY = async (
    couponProduct: ICoupon,
    couponId: string
) => {
    try {
        const res = await httpRequest.put(`/coupon/product-gift/${couponId}`, couponProduct);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const editCouponOrder = async (
    couponOrder: ICoupon,
    couponId: string
) => {
    try {
        const res = await httpRequest.put(`/coupon/order/${couponId}`, couponOrder);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCouponShipping = async (
    couponId: string
) => {
    try {
        const res = await httpRequest.get(`/coupon/${couponId}/shipping`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCouponProduct = async (
    couponId: string
) => {
    try {
        const res = await httpRequest.get(`/coupon/${couponId}/amount-off-product`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCouponBuyXGetY = async (
    couponId: string
) => {
    try {
        const res = await httpRequest.get(`/coupon/${couponId}/product-gift`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCouponOrder = async (
    couponId: string
) => {
    try {
        const res = await httpRequest.get(`/coupon/${couponId}/order`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};