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