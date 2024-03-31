import * as httpRequest from "../../../utils/httpRequest";

export const statisticRevenueToday = async () => {
    try {
        const res = await httpRequest.get(`/statistics/revenue/today`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const statisticOrderQuantity = async () => {
    try {
        const res = await httpRequest.get(`/statistics/order-quantity`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const statisticChartRevenue = async (start_date: string, end_date: string, time_type: string) => {
    try {
        const res = await httpRequest.get(`/statistics/chart/revenue?start_date=${start_date}&end_date=${end_date}&time_type=${time_type}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};