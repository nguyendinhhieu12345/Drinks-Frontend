import { RowDashboard } from "@/components/ColumnDashboard/RowDashboard";
import * as dashboardApi from "@/api/adminApi/dashboardApi/dashboardApi"
import { useEffect, useState } from "react";
import { ArrowsCounterClockwise, Check, ShoppingCartSimple, Truck, X } from "@phosphor-icons/react";
import { IOverview } from "@/pages/AdminPage/DashboardAmin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";

interface IDashboardOverviewOrder {
    success: boolean,
    message: string,
    data: {
        orderQuantity: number,
        pendingOrderQuantity: number,
        processingOrderQuantity: number,
        succeedOrderQuantity: number,
        canceledOrderQuantity: number
    }
}

const DashboardOverviewOrders = (props: IOverview) => {

    const [overviewOrders, setOverviewOrders] = useState<IDashboardOverviewOrder>()
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    useEffect(() => {
        const getOverviewOrders = async () => {
            if (useCurrentUser && useCurrentUser?.success && useCurrentUser?.data?.branchId) {
                const data = await dashboardApi.statisticOrderQuantity(props?.typeSelect, useCurrentUser?.data?.branchId)
                if (data?.success) {
                    setOverviewOrders(data)
                }
            }
            else {
                if (!props?.branchSelect) {
                    const data = await dashboardApi.statisticOrderQuantity(props?.typeSelect)
                    if (data?.success) {
                        setOverviewOrders(data)
                    }
                }
                else {
                    const data = await dashboardApi.statisticOrderQuantity(props?.typeSelect, props?.branchSelect)
                    if (data?.success) {
                        setOverviewOrders(data)
                    }
                }
            }
        }
        getOverviewOrders()
    }, [props?.typeSelect, props?.branchSelect])

    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            <RowDashboard
                icon={
                    <ShoppingCartSimple size={32} />
                }
                title={`Total Order this ${props?.typeSelect}`}
                total={overviewOrders?.success ? overviewOrders?.data?.orderQuantity as number : 0}
                bgColor="green-100"
                textColor="orange-600"
            />
            <RowDashboard
                icon={
                    <ArrowsCounterClockwise size={32} />
                }
                title={`Orders Pending this ${props?.typeSelect}`}
                total={overviewOrders?.success ? overviewOrders?.data?.pendingOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="blue-600"
            />
            <RowDashboard
                icon={
                    <Truck size={32} />
                }
                title={`Orders Processing this ${props?.typeSelect}`}
                total={overviewOrders?.success ? overviewOrders?.data?.processingOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="teal-600"
            />
            <RowDashboard
                icon={
                    <Check size={20} />
                }
                title={`Orders Delivered this ${props?.typeSelect}`}
                total={overviewOrders?.success ? overviewOrders?.data?.succeedOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="green-600"
            />
            <RowDashboard
                icon={
                    <X size={32} />
                }
                title={`Orders Cancel this ${props?.typeSelect}`}
                total={overviewOrders?.success ? overviewOrders?.data?.canceledOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="red-600"
            />
        </div>
    );
};

export default DashboardOverviewOrders;