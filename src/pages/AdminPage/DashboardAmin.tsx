import DashboardOverviewOrders from "@/components/DashboardAdmin/DashboardOverviewOrders";
import DashboardOverviewRevenue from "@/components/DashboardAdmin/DashboardOverviewRevenue";
import RevenueChart from "@/components/DashboardAdmin/RevenueChart";
import { useEffect } from "react";

export default function DashboardAmin() {
  useEffect(() => {
    document.title = "Shopfee | dashboard admin";
  }, []);

  return (
    <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto overflow-auto">
      <h1 className="mb-4 mt-2 text-lg font-bold text-gray-700 ">
        Dashboard Overview
      </h1>
      <DashboardOverviewRevenue />
      <DashboardOverviewOrders />
      <RevenueChart />
    </div>
  );
}
