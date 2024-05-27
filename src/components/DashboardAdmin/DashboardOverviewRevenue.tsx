import { ColumnDashboard } from "@/components/ColumnDashboard/ColumnDashboard";
import * as dashboardApi from "@/api/adminApi/dashboardApi/dashboardApi"
import { useEffect, useState } from "react";
import { ShoppingCartSimple, Stack } from "@phosphor-icons/react";
import { IOverview } from "@/pages/AdminPage/DashboardAmin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";

interface IDashboardOverviewRevenue {
    success: boolean,
    message: string,
    data: {
        revenueByThisMonth: number,
        revenueByThisYear: number,
        revenueByToday: number
    }
}

const DashboardOverviewRevenue = (props: IOverview) => {
    const [overviewRevenue, setOverviewRevenue] = useState<IDashboardOverviewRevenue>()
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    useEffect(() => {
        const getOverviewRevenue = async () => {
            if (useCurrentUser && useCurrentUser?.success && useCurrentUser?.data?.branchId) {
                const data = await dashboardApi.statisticRevenueToday(useCurrentUser?.data?.branchId)
                if (data?.success) {
                    setOverviewRevenue(data)
                }
            }
            else {
                if (!props?.branchSelect) {
                    const data = await dashboardApi.statisticRevenueToday()
                    if (data?.success) {
                        setOverviewRevenue(data)
                    }
                }
                else {
                    const data = await dashboardApi.statisticRevenueToday(props?.branchSelect)
                    if (data?.success) {
                        setOverviewRevenue(data)
                    }
                }
            }
        }
        getOverviewRevenue()
    }, [props?.branchSelect])

    return (
        <div className="flex items-center justify-between mb-8 flex-wrap">
            <ColumnDashboard
                icon={
                    <Stack size={32} />
                }
                title="Today Orders"
                price={overviewRevenue?.success ? overviewRevenue?.data?.revenueByToday as number : 0}
                bgColor={props?.typeSelect === "day" ? "green-500" : "blue-500"}
                setTypeSelect={props?.setTypeSelect}
                typeSelect={props?.typeSelect}
            />
            <ColumnDashboard
                icon={
                    <ShoppingCartSimple size={32} />
                }
                title="This Month"
                price={overviewRevenue?.success ? overviewRevenue?.data?.revenueByThisMonth as number : 0}
                bgColor={props?.typeSelect === "month" ? "green-500" : "blue-500"}
                setTypeSelect={props?.setTypeSelect}
                typeSelect={props?.typeSelect}
            />
            <ColumnDashboard
                icon={
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        version="1.1"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
                    </svg>
                }
                title="This Year"
                price={overviewRevenue?.success ? overviewRevenue?.data?.revenueByThisYear as number : 0}
                bgColor={props?.typeSelect === "year" ? "green-500" : "blue-500"}
                setTypeSelect={props?.setTypeSelect}
                typeSelect={props?.typeSelect}
            />
        </div>
    );
};

export default DashboardOverviewRevenue;