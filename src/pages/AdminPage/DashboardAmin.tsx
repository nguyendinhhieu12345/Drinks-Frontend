import DashboardOverviewOrders from "@/components/DashboardAdmin/DashboardOverviewOrders";
import DashboardOverviewRevenue from "@/components/DashboardAdmin/DashboardOverviewRevenue";
import RevenueChart from "@/components/DashboardAdmin/RevenueChart";
import { useEffect, useState } from "react";
import { IResponseBranch } from "./Branchs";
import * as branchApi from "@/api/adminApi/branchApi/branchApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import OpenAppButton from "./openApp";

export interface IOverview {
    typeSelect: string;
    setTypeSelect: React.Dispatch<React.SetStateAction<string>>,
    branchSelect?: string
}

export default function DashboardAmin() {
    const [typeSelect, setTypeSelect] = useState<string>("day")
    const [branchs, setBranchs] = useState<IResponseBranch>();
    const [branchSelect, setBranchSelect] = useState<string>("")

    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const getAllBranch = async () => {
        const data = await branchApi.getAllBranch(1);
        if (data?.success) {
            setBranchs(data);
        }
    };

    useEffect(() => {
        if (!useCurrentUser?.data?.branchId) {
            getAllBranch()
        }
        document.title = "Shopfee | dashboard admin";
    }, []);

    return (
        <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto overflow-auto">
            <div className="flex items-center justify-between mb-4" >
                <h1 className="mb-4 mt-2 text-lg font-bold text-gray-700 ">
                    Dashboard Overview
                </h1>
                {!useCurrentUser?.data?.branchId && <div className="">
                    <select
                        onChange={e => setBranchSelect(e.target.value)}
                        className="w-full rounded-xl text-base"
                    >
                        <option value="">
                            All
                        </option>
                        {branchs?.data?.branchList?.map((branch, index) => (
                            <option key={index} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>
                }
            </div>
            <DashboardOverviewRevenue typeSelect={typeSelect} setTypeSelect={setTypeSelect} branchSelect={branchSelect} />
            <DashboardOverviewOrders typeSelect={typeSelect} setTypeSelect={setTypeSelect} branchSelect={branchSelect} />
            <RevenueChart branchSelect={branchSelect} />
            <OpenAppButton />
        </div>
    );
}
