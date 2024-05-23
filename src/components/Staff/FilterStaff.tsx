import { useState } from "react";
import { Add } from "../SVG/Add.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";

interface IFilterStaff {
    openDrawer: () => void;
    getAllEmployee: (key: string, page: number, status: string) => Promise<void>;
    getAllEmployeeByBranchId: (key: string, page: number, status: string) => Promise<void>;
}

function FilterStaff(props: IFilterStaff) {
    const [keySearch, setKeySearch] = useState<{
        key: string;
        status: string;
    }>({
        key: "",
        status: "ACTIVE",
    });
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const handleSeachEmployee = async () => {
        if (currentUser && currentUser?.success && currentUser?.data?.branchId) {
            props?.getAllEmployeeByBranchId(keySearch?.key, 1, keySearch?.status);
        }
        else {
            props?.getAllEmployee(keySearch?.key, 1, keySearch?.status);
        }
    };

    const handleResetEmployee = async () => {
        setKeySearch((prev: any) => ({
            ...prev,
            status: "ACTIVE",
        }));
        if (currentUser && currentUser?.success && currentUser?.data?.branchId) {
            props?.getAllEmployeeByBranchId("", 1, "");
        }
        else {
            props?.getAllEmployee("", 1, "");
        }
    };
    return (
        <div className="min-w-0 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0 mb-4">
            <div className="py-2 px-4">
                <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
                            type="search"
                            name="search"
                            placeholder="Search by username"
                            onChange={(e) =>
                                setKeySearch((prev: any) => ({
                                    ...prev,
                                    key: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <div className="w-full mx-1">
                            <button
                                className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 h-12 w-full"
                                type="submit"
                                onClick={handleSeachEmployee}
                            >
                                Filter
                            </button>
                        </div>
                        <div className="w-full mx-1">
                            <button
                                className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                                type="button"
                                onClick={props?.openDrawer}
                            >
                                <span className="mr-2">
                                    <Add />
                                </span>
                                Add Staff
                            </button>
                        </div>
                        <div className="w-full mx-1">
                            <select
                                className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white  focus:border-gray-200 border-gray-200 focus:shadow-none leading-5"
                                onChange={(e) =>
                                    setKeySearch((prev: any) => ({
                                        ...prev,
                                        status: e.target.value,
                                    }))
                                }
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">InActive</option>
                            </select>
                        </div>
                        <div className="w-full mx-1">
                            <button
                                className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                                type="reset"
                                onClick={handleResetEmployee}
                            >
                                <span className="text-black ">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterStaff;
