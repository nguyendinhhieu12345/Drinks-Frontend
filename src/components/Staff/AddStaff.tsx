import { IBranch } from "@/types/type";
import { ChangeEvent, useEffect, useState } from "react";
import * as branchApi from "@/api/adminApi/branchApi/branchApi";
import * as employeeApi from "@/api/adminApi/employeeApi/employeeApi";
import useLoading from "@/hooks/useLoading";
import { toast } from "react-toastify";
import { Spinner, Switch } from "@material-tailwind/react";
import InputWrap from "../InputWrap/InputWrap";
import { getToday } from "@/utils/helper";

interface INewStaff {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    birthDate: string;
    branchId: string;
    gender: boolean;
    email: string;
    phoneNumber: string;
    role: string;
    isEdit?: boolean;
    id?: string;
    status?: string;
}

interface IAddStaff {
    setOpenCreateStaff: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit: boolean;
    closeDrawer: () => void;
    employeeId?: string;
}

function AddStaff(props: IAddStaff) {
    const [branchs, setBranchs] = useState<IBranch[]>([]);
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [newStaff, setNewStaff] = useState<INewStaff>({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        birthDate: getToday(),
        branchId: "",
        gender: true,
        email: "",
        phoneNumber: "",
        role: "ROLE_USER",
        isEdit: false,
        status: "ACTIVE",
    });

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        key: string
    ): void => {
        const { value } = event.target;
        setNewStaff((prevState: INewStaff) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleAddStaff = async () => {
        console.log(newStaff)
        if (
            newStaff && newStaff?.username && newStaff?.firstName && newStaff?.lastName && newStaff?.birthDate &&
            newStaff?.branchId && newStaff?.phoneNumber && newStaff?.email &&
            newStaff?.username !== "" &&
            newStaff?.firstName !== "" &&
            newStaff?.lastName !== "" &&
            newStaff?.birthDate !== "" &&
            newStaff?.branchId !== "" &&
            newStaff?.phoneNumber !== "" &&
            newStaff?.email !== ""
        ) {
            try {
                if (!newStaff?.isEdit) {
                    startLoading();
                    const data = await employeeApi.addEmployee(
                        newStaff?.username,
                        newStaff?.password,
                        newStaff?.firstName,
                        newStaff?.lastName,
                        newStaff?.birthDate,
                        newStaff?.gender ? "MALE" : "FEMALE",
                        newStaff?.branchId,
                        newStaff?.email,
                        newStaff?.phoneNumber,
                        newStaff?.role
                    );
                    if (data.success) {
                        stopLoading();
                        toast.success(data.message);
                        props?.setOpenCreateStaff(false);
                    }
                } else {
                    startLoading();
                    const data = await employeeApi.updateEmployee(
                        newStaff?.firstName,
                        newStaff?.lastName,
                        newStaff?.birthDate,
                        newStaff?.gender ? "MALE" : "FEMALE",
                        newStaff?.status as string,
                        newStaff?.id as string,
                        newStaff?.email,
                        newStaff?.phoneNumber,
                        newStaff?.branchId
                    );
                    if (data.success) {
                        stopLoading();
                        toast.success(data.message);
                        props?.setOpenCreateStaff(false);
                        setNewStaff({
                            username: "",
                            firstName: "",
                            lastName: "",
                            password: "",
                            birthDate: getToday(),
                            branchId: "",
                            gender: true,
                            email: "",
                            phoneNumber: "",
                            role: "ROLE_USER",
                            isEdit: false,
                            status: "ACTIVE",
                        });
                    }
                }
            } catch (err: any) {
                stopLoading();
                toast.error(err?.response?.data?.message, {
                    position: "bottom-left",
                });
            }
        } else {
            stopLoading();
            toast.error("Please fill out all fields completely", {
                position: "bottom-left",
            });
        }
    };

    const getAllBranch = async () => {
        const data = await branchApi.getAllBranch(1);
        setBranchs(data?.data?.branchList);
        setNewStaff((prevState: INewStaff) => ({
            ...prevState,
            branchId: prevState?.isEdit ? data?.data?.branchList?.filter((branch: any) => branch?.name === prevState?.branchId)[0]?.id : data?.data?.branchList[0]?.id
        }));
    };

    const getEmployeeById = async () => {
        const data = await employeeApi.getEmployeeById(props?.employeeId as string);
        setNewStaff(data?.data);
        setNewStaff((prev: INewStaff) => ({
            ...prev,
            isEdit: true,
            branchId: data?.data?.branchName
        }));
    };

    useEffect(() => {
        if (props?.isEdit) {
            getEmployeeById();
            setNewStaff((prevState: INewStaff) => ({
                ...prevState,
                isEdit: true,
            }));
        }
        getAllBranch();
    }, []);

    return (
        <div className="flex flex-col w-full h-full justify-between">
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
                <div className="flex md:flex-row flex-col justify-between mr-20">
                    <div>
                        <h4 className="text-xl font-medium">
                            {newStaff?.isEdit ? "Edit" : "Add"} Staff
                        </h4>
                        <p className="mb-0 text-sm">
                            {newStaff?.isEdit ? "Edit" : "Add"} your staff and necessary
                            information from here
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40 overflow-y-auto">
                {/* Input Username */}
                {!newStaff?.isEdit && (
                    <InputWrap
                        type="text"
                        placeholder="Username"
                        value={newStaff?.username}
                        handleInputChange={(e) => handleInputChange(e, "username")}
                        title="Username"
                        keyName="username"
                    />
                )}

                {/* Input FName */}
                <InputWrap
                    type="text"
                    placeholder="First name"
                    value={newStaff?.firstName}
                    handleInputChange={(e) => handleInputChange(e, "firstName")}
                    title="First Name"
                    keyName="firstName"
                />

                {/* Input LName */}
                <InputWrap
                    type="text"
                    placeholder="Last name"
                    value={newStaff?.lastName}
                    handleInputChange={(e) => handleInputChange(e, "lastName")}
                    title="Last Name"
                    keyName="lastName"
                />

                {/* Input Password */}
                {!newStaff?.isEdit && (
                    <InputWrap
                        type="password"
                        placeholder="Password"
                        value={newStaff?.password}
                        handleInputChange={(e) => handleInputChange(e, "password")}
                        title="Password"
                        keyName="password"
                    />
                )}

                {/* Input Email */}
                <InputWrap
                    type="text"
                    placeholder="Email"
                    value={newStaff?.email}
                    handleInputChange={(e) => handleInputChange(e, "email")}
                    title="Email"
                    keyName="email"
                />

                {/* Input Phone */}

                <InputWrap
                    type="text"
                    placeholder="Phone"
                    value={newStaff?.phoneNumber}
                    handleInputChange={(e) => handleInputChange(e, "phoneNumber")}
                    title="Phone"
                    keyName="phoneNumber"
                />

                {/* Input Birthday */}
                <InputWrap
                    type="date"
                    placeholder="Birthday"
                    value={new Date(newStaff?.birthDate ? newStaff?.birthDate : getToday()).toISOString().slice(0, 10)}
                    handleInputChange={(e) => handleInputChange(e, "birthDate")}
                    title="Birthday"
                    keyName="birthDate"
                />

                {/* Input Branch */}
                {newStaff?.role !== "ROLE_ADMIN" &&
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                            Branch
                        </label>
                
                        <div className="col-span-8 sm:col-span-4">
                            <div className="w-full text-center">
                                <select
                                    value={branchs?.filter((branch) => branch.id === newStaff?.branchId)
                                        .length > 0
                                        ? branchs.filter((branch) => branch.id === newStaff?.branchId)[0]
                                            ?.id
                                        : newStaff?.branchId}
                                    className="w-full rounded-xl text-base"
                                    onChange={(e) => {
                                        setNewStaff((prevState: INewStaff) => ({
                                            ...prevState,
                                            ["branchId"]: e.target.value,
                                        }));
                                    }}
                                >
                                    {branchs.map((branch, index) => (
                                        <option key={index} value={branch?.id}>
                                            {branch?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                }

                {!newStaff?.isEdit && (
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                            Role
                        </label>
                        <div className="col-span-8 sm:col-span-4">
                            <div className="w-full text-center">
                                <select
                                    className="w-full rounded-xl text-base"
                                    onChange={(e) => {
                                        setNewStaff((prevState: INewStaff) => ({
                                            ...prevState,
                                            ["role"]: e.target.value,
                                        }));
                                    }}
                                >
                                    {/* <option value="ROLE_USER">User</option> */}
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_WAITER">Employee</option>
                                    {/* <option value="ROLE_SHIPPER">Shipper</option> */}
                                    <option value="ROLE_MANAGER">Manager</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {newStaff?.isEdit && (
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                            Status
                        </label>
                        <div className="col-span-8 sm:col-span-4">
                            <div className="w-full text-center">
                                <select
                                    className="w-full rounded-xl text-base"
                                    onChange={(e) => {
                                        setNewStaff((prevState: INewStaff) => ({
                                            ...prevState,
                                            ["status"]: e.target.value,
                                        }));
                                    }}
                                    value={newStaff?.status}
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Choose status */}
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                        Gender
                    </label>
                    <div className="col-span-8 sm:col-span-4 flex">
                        <p className="opacity-80  mr-2">Female</p>
                        <Switch
                            color="green"
                            label="Male"
                            onChange={(e) => {
                                setNewStaff((prevState: INewStaff) => ({
                                    ...prevState,
                                    ["gender"]: e.target.checked,
                                }));
                            }}
                            checked={newStaff?.gender}
                            crossOrigin={true.toString()}
                        />
                    </div>
                </div>
            </div>
            <div className="absolute z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                    <button
                        className="transition-colors duration-150 font-medium py-2 text-sm focus:outline-none rounded-lg border 
        border-gray-200 px-4 mr-3 flex items-center justify-center cursor-pointer bg-white w-full text-red-500
         hover:bg-red-50 hover:border-red-100 hover:text-red-600 
         "
                        onClick={props?.closeDrawer}
                    >
                        Cancel
                    </button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                    <button
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent hover:bg-green-600 w-full"
                        type="submit"
                        onClick={handleAddStaff}
                    >
                        {isLoading ? (
                            <p className="flex items-center justify-center">
                                <span className="mr-2">Save</span>{" "}
                                <Spinner className="h-4 w-4" />
                            </p>
                        ) : (
                            <span>{newStaff?.isEdit ? "Edit" : "Add"} Staff</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddStaff;
