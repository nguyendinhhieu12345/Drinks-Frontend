import * as httpRequest from "../../../utils/httpRequest";

export const statisticRevenueToday = async (branch_id?: string) => {
    try {
        const res = await httpRequest.get(`/statistics/revenue/current${branch_id ? "?branch_id:" + branch_id : ""}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const statisticOrderQuantity = async (type: string, branch_id?: string) => {
    try {
        const res = await httpRequest.get(`/statistics/order-quantity?time_type=${type}${branch_id ? "&branch_id:" + branch_id : ""}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const statisticChartRevenue = async (start_date: string, end_date: string, time_type: string, branch_id?: string) => {
    try {
        const res = await httpRequest.get(`/statistics/chart/revenue?start_date=${start_date}&end_date=${end_date}&time_type=${time_type}${branch_id ? "&branch_id:" + branch_id : ""}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};