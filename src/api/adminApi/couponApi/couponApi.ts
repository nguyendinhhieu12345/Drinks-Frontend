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