import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import * as dashboardApi from "@/api/adminApi/dashboardApi/dashboardApi"
import { getOneMonthAgo, getToday } from "@/utils/helper";

const data = [
    {
        timePoint: "05/01/2024",
        revenue: 4000,
    },
    {
        timePoint: "06/01/2024",
        revenue: 3000,
    },
    {
        timePoint: "07/01/2024",
        revenue: 2000,
    },
    {
        timePoint: "08/01/2024",
        revenue: 2780,
    },
    {
        timePoint: "09/01/2024",
        revenue: 1890,
    },
    {
        timePoint: "10/01/2024",
        revenue: 2390,
    },
    {
        timePoint: "11/01/2024",
        revenue: 3490,
    },
];

interface IDashboardChartRevenue {
    success: boolean,
    message: string,
    data: {
        revenueList: {
            timePoint: string;
            revenue: number
        }[]
    }
}

const RevenueChart = () => {
    const [dataGet, setDataGet] = useState<{
        start_date: string;
        end_date: string;
        time_type: string;
    }>({
        start_date: getOneMonthAgo(),
        end_date: getToday(),
        time_type: "day"
    })

    const [chartRevenue, setChartRevenue] = useState<IDashboardChartRevenue>()

    const getOverviewRevenue = async () => {
        const data = await dashboardApi.statisticChartRevenue(dataGet?.start_date, dataGet?.end_date, dataGet?.time_type)
        if (data?.success) {
            setChartRevenue(data)
        }
    }

    useEffect(() => {
        getOverviewRevenue()
    }, [])

    return (
        <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center mt-4">
            <div className="my-4 mx-1 md:p-5 bg-white w-full lg:w-full rounded-lg">
                <div className="flex items-center w-full justify-between">
                    <p className="font-semibold text-[14px] text-[#685F78] uppercase">
                        Revenue chart
                    </p>
                    <div className="flex items-center justify-center">
                        <p className="font-medium text-base">
                            Select time
                        </p>
                        <input
                            className="bg-gray-50 w-auto border border-gray-300 text-gray-900 text-sm rounded-lg p-2 ml-2"
                            type="date"
                            value={dataGet?.start_date}
                            onChange={(e) => {
                                setDataGet((prev: any) => ({
                                    ...prev,
                                    start_date: e.target.value
                                }))
                            }}
                        />
                        <ArrowRight className="px-2 mx-1" size={32} />
                        <input
                            className="bg-gray-50 w-auto border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
                            type="date"
                            value={dataGet?.end_date}
                            onChange={(e) => {
                                setDataGet((prev: any) => ({
                                    ...prev,
                                    end_date: e.target.value
                                }))
                            }}
                        />
                        <p className="mx-2 font-medium text-base">
                            Type
                        </p>
                        <select className="bg-gray-50 w-25 border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
                            onChange={(e) => {
                                setDataGet((prev: any) => ({
                                    ...prev,
                                    time_type: e.target.value
                                }))
                            }}>
                            <option value="day">Day</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                        <button onClick={getOverviewRevenue} className="p-2 text-base mx-2 bg-blue-500 text-white rounded-lg">Appy</button>
                    </div>
                </div>
                <div className="w-full h-[350px] mt-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartRevenue?.success ? chartRevenue?.data?.revenueList : data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timePoint" />
                            <YAxis label={{ value: 'VND', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8884d8"
                                fill="#8884d8"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;