import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { Drawer, Spinner, Switch } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import * as branchApi from "@/api/adminApi/branchApi/branchApi";
import * as employeeApi from "@/api/adminApi/employeeApi/employeeApi";
import { IBranch, IStaff } from "@/types/type";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import TableAdmin from "@/components/TableAdmin/TableAdmin";

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
  const [branchs, setBranchs] = useState<IBranch[]>([]);
  const [newStaff, setNewStaff] = useState<INewStaff>({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    birthDate: "",
    branchId: "",
    gender: true,
    email: "",
    phoneNumber: "",
    role: "ROLE_USER",
    isEdit: false,
    status: "ACTIVE",
  });
  const [employees, setEmployees] = useState<IEmployeeResponse>();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [open, setOpen] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<string>("");
  const [keySearch, setKeySearch] = useState<{
    key: string;
    status: string;
  }>({
    key: "",
    status: "ACTIVE",
  });

  const openDrawer = async () => {
    setOpenCreateStaff(true);
    const data = await branchApi.getAllBranch(1);
    setBranchs(data?.data?.branchList);
    setNewStaff((prevState: INewStaff) => ({
      ...prevState,
      ["branchId"]: data?.data[0]?.id,
    }));
  };
  const closeDrawer = () => {
    setOpenCreateStaff(false);
    setNewStaff({
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      birthDate: "",
      branchId: "",
      gender: true,
      email: "",
      phoneNumber: "",
      role: "ROLE_USER",
      isEdit: false,
      status: "ACTIVE",
    });
  };

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
    if (
      newStaff?.username !== "" &&
      newStaff?.firstName !== "" &&
      newStaff?.lastName !== "" &&
      newStaff?.birthDate !== "" &&
      newStaff?.branchId !== "" &&
      newStaff?.password !== ""
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
            setOpenCreateStaff(false);
            getAllEmployee("", 1, "");
          }
        } else {
          startLoading();
          const data = await employeeApi.updateEmployee(
            newStaff?.firstName,
            newStaff?.lastName,
            newStaff?.birthDate,
            newStaff?.gender ? "MALE" : "FEMALE",
            newStaff?.status as string,
            newStaff?.id as string
          );
          if (data.success) {
            stopLoading();
            toast.success(data.message);
            setOpenCreateStaff(false);
            getAllEmployee("", 1, "");
            setNewStaff({
              username: "",
              firstName: "",
              lastName: "",
              password: "",
              birthDate: "",
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

  const getAllEmployee = async (key: string, page: number, status: string) => {
    const data = await employeeApi.getAllEmployee(key, page, status);
    setEmployees(data);
  };

  useEffect(() => {
    getAllEmployee("", 1, "");
  }, []);

  // Open confirm delete
  const handleOpen = () => setOpen(!open);

  const handleDelete = (e: string) => {
    setOpen(!open);
    setEmployeeId(e);
  };

  const handleDeleteEmployee = async () => {
    setOpen(!open);
    try {
      const data = await employeeApi.deleteEmployee(employeeId);
      if (data?.success) {
        toast.success(data?.message);
        getAllEmployee("", 1, "");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleSeachEmployee = async () => {
    getAllEmployee(keySearch?.key, 1, keySearch?.status);
  };

  const handleResetEmployee = async () => {
    setKeySearch((prev: any) => ({
      ...prev,
      status: "ACTIVE",
    }));
    getAllEmployee("", 1, "");
  };

  const handleRedirectEditEmployee = async (employeeId: string) => {
    setOpenCreateStaff(true);
    const data = await employeeApi.getEmployeeById(employeeId);
    setNewStaff(data?.data);
    setNewStaff((prev: INewStaff) => ({
      ...prev,
      isEdit: true,
    }));
    setNewStaff((prev: INewStaff) => ({
      ...prev,
      isEdit: true,
    }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Staffs</h1>

        {/* Model create Staff */}
        <Drawer
          placeholder=""
          placement="right"
          open={openCreateStaff}
          onClose={closeDrawer}
          size={700}
        >
          <button
            className="absolute focus:outline-none z-10 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
            onClick={closeDrawer}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
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
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                    Username
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                      type="text"
                      name="name"
                      placeholder="Username"
                      value={newStaff?.username}
                      onChange={(e) => handleInputChange(e, "username")}
                    />
                  </div>
                </div>
              )}

              {/* Input FName */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                  First Name
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                    type="text"
                    name="name"
                    placeholder="First name"
                    value={newStaff?.firstName}
                    onChange={(e) => handleInputChange(e, "firstName")}
                  />
                </div>
              </div>

              {/* Input LName */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                  Last Name
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                    type="text"
                    placeholder="Last name"
                    name="name"
                    value={newStaff?.lastName}
                    onChange={(e) => handleInputChange(e, "lastName")}
                  />
                </div>
              </div>

              {/* Input Password */}
              {!newStaff?.isEdit && (
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                    Password
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                      type="password"
                      name="name"
                      placeholder="Password"
                      value={newStaff?.password}
                      onChange={(e) => handleInputChange(e, "password")}
                    />
                  </div>
                </div>
              )}

              {/* Input Email */}
              {!newStaff?.isEdit && (
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                    Email
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                      type="text"
                      name="name"
                      placeholder="Email"
                      value={newStaff?.email}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  </div>
                </div>
              )}

              {/* Input Phone */}
              {!newStaff?.isEdit && (
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                    Phone
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                      type="text"
                      name="name"
                      placeholder="Phone"
                      value={newStaff?.phoneNumber}
                      onChange={(e) => handleInputChange(e, "phoneNumber")}
                    />
                  </div>
                </div>
              )}

              {/* Input Birthday */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                  Birthday
                </label>

                <div className="col-span-8 sm:col-span-4">
                  <div className="w-full text-center">
                    <input
                      className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                      type="date"
                      name="joiningDate"
                      placeholder="Joining Date"
                      value={newStaff?.birthDate}
                      onChange={(e) => handleInputChange(e, "birthDate")}
                    />
                  </div>
                </div>
              </div>

              {/* Input Branch */}
              {!newStaff?.isEdit && (
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                    Branch
                  </label>

                  <div className="col-span-8 sm:col-span-4">
                    <div className="w-full text-center">
                      <select
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
              )}

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
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_EMPLOYEE">Employee</option>
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
                  onClick={closeDrawer}
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
        </Drawer>

        {/* Filter */}
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
                    onClick={openDrawer}
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
