import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { Drawer, Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as employeeApi from "@/api/adminApi/employeeApi/employeeApi";
import { IStaff } from "@/types/type";
import { toast } from "react-toastify";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import ButtonCloseDrawer from "@/components/ButtonCloseDrawer/ButtonCloseDrawer";
import AddStaff from "@/components/Staff/AddStaff";
import FilterStaff from "@/components/Staff/FilterStaff";
import { Key } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";

interface IEmployeeResponse {
    timestamp: string;
    success: boolean;
    message: string;
    data: {
        totalPage: number;
        employeeList: IStaff[];
    };
}

export default function OurStaff() {
    const [openCreateStaff, setOpenCreateStaff] = useState<boolean>(false);
    const [employees, setEmployees] = useState<IEmployeeResponse>();
    const [open, setOpen] = useState<boolean>(false);
    const [employeeId, setEmployeeId] = useState<{
        delete: string;
        edit: string;
    }>({
        edit: "",
        delete: "",
    });
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const openDrawer = () => {
        setOpenCreateStaff(true);
        setEmployeeId({ edit: "", delete: "" });
    };
    const closeDrawer = () => {
        setOpenCreateStaff(false);
        setEmployeeId({ edit: "", delete: "" });
    };

    const getAllEmployee = async (key: string, page: number, status: string) => {
        const data = await employeeApi.getAllEmployee(key, page, status);
        setEmployees(data);
    };

    useEffect(() => {
        if (!openCreateStaff) {
            getAllEmployee("", 1, "");
        }
    }, [openCreateStaff]);

    // Open confirm delete
    const handleOpen = () => setOpen(!open);

    const handleDelete = (e: string) => {
        setOpen(!open);
        setEmployeeId((prev: any) => ({
            ...prev,
            delete: e,
        }));
    };

    const handleDeleteEmployee = async () => {
        setOpen(!open);
        try {
            const data = await employeeApi.deleteEmployee(employeeId?.delete);
            if (data?.success) {
                toast.success(data?.message);
                getAllEmployee("", 1, "");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
        }
    };

    const handleRedirectEditEmployee = async (employeeId: string) => {
        setOpenCreateStaff(true);
        setEmployeeId((prev: any) => ({
            ...prev,
            edit: employeeId,
        }));
    };

    const handleResetPassword = async (employeeId: string) => {
        try {
            const data = await employeeApi.resetPassword(employeeId, "123456");
            if (data?.success) {
                toast.success(data?.message);
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
        }
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
                <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Staffs</h1>

                {/* Model create Staff */}
                {openCreateStaff && (
                    <Drawer
                        placeholder=""
                        placement="right"
                        open={openCreateStaff}
                        onClose={closeDrawer}
                        size={700}
                    >
                        <ButtonCloseDrawer closeDrawer={closeDrawer} />
                        <AddStaff
                            setOpenCreateStaff={setOpenCreateStaff}
                            isEdit={employeeId?.edit ? true : false}
                            closeDrawer={closeDrawer}
                            employeeId={employeeId.edit}
                        />
                    </Drawer>
                )}

                {/* Filter */}
                <FilterStaff openDrawer={openDrawer} getAllEmployee={getAllEmployee} />

                {/* Table staff */}
                <TableAdmin
                    fieldTable={[
                        "id",
                        "Full name",
                        "Username",
                        "BirthDay",
                        "Gender",
                        "Status",
                        "actions",
                    ]}
                    data={employees}
                    isPaging={true}
                    title="Product"
                    getAllProduct={getAllEmployee}
                    scriptData={
                        <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
                            {employees?.data?.employeeList?.map((emp, i) => (
                                <tr key={i}>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{emp.id}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">
                                            {emp.firstName + " " + emp.lastName}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{emp.username}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{emp.birthDate}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{emp.gender}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        {emp.status === "ACTIVE" && (
                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                                                {emp.status}
                                            </span>
                                        )}
                                        {emp.status === "INACTIVE" && (
                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                                                {emp.status}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        <div className="flex justify-end text-right">
                                            {emp?.id !== currentUser?.data?.employeeId &&
                                                <>
                                                    <button
                                                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                                        onClick={() => handleRedirectEditEmployee(emp?.id)}
                                                    >
                                                        <p data-tip="true" data-for="edit" className="text-xl">
                                                            <Edit />
                                                        </p>
                                                    </button>
                                                    <button
                                                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                                        onClick={() => handleDelete(emp.id)}
                                                    >
                                                        <p
                                                            data-tip="true"
                                                            data-for="delete"
                                                            className="text-xl"
                                                        >
                                                            <Delete />
                                                        </p>
                                                    </button>
                                                </>
                                            }

                                            <button
                                                className="p-2 cursor-pointer text-gray-600 hover:text-emerald-600 focus:outline-none"
                                                onClick={() => handleResetPassword(emp?.id)}
                                            >
                                                <Tooltip content="Reset pasword">
                                                    <Key size={20} />
                                                </Tooltip>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                />
                {/*  */}
                <TableConfirmDelete
                    open={open}
                    handleOpen={handleOpen}
                    title="Staff"
                    handleDelete={handleDeleteEmployee}
                />
            </div>
        </div>
    );
}
