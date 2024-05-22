import { RowDashboard } from "@/components/ColumnDashboard/RowDashboard";
import * as dashboardApi from "@/api/adminApi/dashboardApi/dashboardApi"
import { useEffect, useState } from "react";
import { ArrowsCounterClockwise, Check, ShoppingCartSimple, Truck, X } from "@phosphor-icons/react";

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

const DashboardOverviewOrders = () => {

    const [overviewOrders, setOverviewOrders] = useState<IDashboardOverviewOrder>()

    useEffect(() => {
        const getOverviewOrders = async () => {
            const data = await dashboardApi.statisticOrderQuantity()
            if (data?.success) {
                setOverviewOrders(data)
            }
        }
        getOverviewOrders()
    }, [])

    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            <RowDashboard
                icon={
                    <ShoppingCartSimple size={32} />
                }
                title="Total Order"
                total={overviewOrders?.success ? overviewOrders?.data?.orderQuantity as number : 0}
                bgColor="green-100"
                textColor="orange-600"
            />
            <RowDashboard
                icon={
                    <ArrowsCounterClockwise size={32} />
                }
                title="Orders Pending"
                total={overviewOrders?.success ? overviewOrders?.data?.pendingOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="blue-600"
            />
            <RowDashboard
                icon={
                    <Truck size={32} />
                }
                title="Orders Processing"
                total={overviewOrders?.success ? overviewOrders?.data?.processingOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="teal-600"
            />
            <RowDashboard
                icon={
                    <Check size={20} />
                }
                title="Orders Delivered"
                total={overviewOrders?.success ? overviewOrders?.data?.succeedOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="green-600"
            />
            <RowDashboard
                icon={
                    <X size={32} />
                }
                title="Orders Cancel"
                total={overviewOrders?.success ? overviewOrders?.data?.canceledOrderQuantity as number : 0}
                bgColor="green-100"
                textColor="red-600"
            />
        </div>
    );
};

export default DashboardOverviewOrders;