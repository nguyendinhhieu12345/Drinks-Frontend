import { Spinner, Switch } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as profileApi from "@/api/adminApi/profileApi/profileApi"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { User } from "@/type";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";

interface IProfileAdmin {
    username: string,
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: string,
    phoneNumber: string
}

export default function ProfileAdmin() {
    const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
    const [profileAdmin, setProfileAdmin] = useState<IProfileAdmin>()
    const [password, setPassword] = useState<{
        oldPassword: string,
        newPassword: string,
        comfirmNewPassword: string
    }>({
        oldPassword: "",
        newPassword: "",
        comfirmNewPassword: ""
    })
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const getProfileAdmin = async () => {
            const data = await profileApi.getProfileAdminById(useCurrentUser?.data?.employeeId as string)
            if (data?.success) {
                setProfileAdmin(data?.data)
            }
        }
        getProfileAdmin()
    }, [])

    const handleEditProfile = async () => {
        try {
            if (isOpenPassword) {
                if (password?.newPassword.trim() !== "" && password?.comfirmNewPassword.trim() !== "" && password?.oldPassword.trim() !== "") {
                    if (password?.comfirmNewPassword.trim() === password?.newPassword.trim()) {
                        startLoading()
                        const data = await profileApi.changePasswordAdminById(useCurrentUser?.data?.employeeId, password?.oldPassword, password?.newPassword)
                        if (data?.success) {
                            stopLoading()
                            toast.success(data?.message)
                            setPassword({
                                oldPassword: "",
                                newPassword: "",
                                comfirmNewPassword: ""
                            })
                        }
                    }
                    else {
                        stopLoading()
                        toast.error("Please enter confirmation that the new password matches the new password!")
                    }
                }
                else {
                    stopLoading()
                    toast.error("Please fill out all fields completely")
                }
            }
            else {
                if (profileAdmin?.birthDate && profileAdmin?.birthDate.trim() !== "" && profileAdmin?.phoneNumber && profileAdmin?.phoneNumber.trim() !== "" && profileAdmin?.gender && profileAdmin?.gender.trim() !== "") {
                    startLoading()
                    const data = await profileApi.updateProfileAdminById(useCurrentUser?.data?.employeeId as string, profileAdmin?.birthDate as string, profileAdmin?.gender as string, profileAdmin?.phoneNumber as string)
                    if (data?.success) {
                        stopLoading()
                        toast.success(data?.message)
                    }
                }
                else {
                    stopLoading()
                    toast.error("Please fill out all fields completely")
                }
            }
        }
        catch (error: any) {
            stopLoading()
            if (error?.response?.data?.error?.errorCode === 13) {
                error?.response?.data?.devResponse?.details?.map((err: any) => (
                    toast.error(err?.field + " " + err?.validate)
                ))
            }
            toast.error(error?.response?.data?.error?.errorMessage)
        }
    }

    return (
        <div className="p-6 flex-grow scrollbar-hide w-full h-auto max-h-full  bg-white rounded-lg">
            {/* Input Username */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                    Username
                </label>
                <div className="col-span-8 sm:col-span-4">
                    <input
                        className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                        type="text"
                        name="name"
                        disabled
                        placeholder="Username"
                        value={profileAdmin?.username}
                    />
                </div>
            </div>

            {/* Input FName */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                    Full Name
                </label>
                <div className="col-span-8 sm:col-span-4">
                    <input
                        className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                        type="text"
                        name="name"
                        disabled
                        placeholder="Full name"
                        value={profileAdmin?.firstName + " " + profileAdmin?.lastName}
                    />
                </div>
            </div>

            {/* Input Phone */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                    Phone Number
                </label>
                <div className="col-span-8 sm:col-span-4">
                    <input
                        onChange={(e) => setProfileAdmin((prev: IProfileAdmin | undefined) => ({
                            ...prev!,
                            phoneNumber: e.target.value
                        }))}
                        className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                        type="text"
                        name="name"
                        placeholder="Phone Number"
                        value={profileAdmin?.phoneNumber}
                    />
                </div>
            </div>

            {/* Input Birthday */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                    Birthday
                </label>

                <div className="col-span-8 sm:col-span-4">
                    <div className="w-full text-center">
                        <input
                            onChange={(e) => setProfileAdmin((prev: IProfileAdmin | undefined) => ({
                                ...prev!,
                                birthDate: e.target.value
                            }))}
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                            type="date"
                            name="joiningDate"
                            placeholder="Joining Date"
                            value={profileAdmin?.birthDate}
                        />
                    </div>
                </div>
            </div>

            {/* Choose status */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                    Gender
                </label>
                <div className="col-span-8 sm:col-span-4 flex items-start">
                    <p className="opacity-80  mr-2">Female</p>
                    <Switch onChange={(e) => {
                        if (e.target.checked) {
                            setProfileAdmin((prev: IProfileAdmin | undefined) => ({
                                ...prev!,
                                gender: "MALE"
                            }))
                        }
                        else {
                            setProfileAdmin((prev: IProfileAdmin | undefined) => ({
                                ...prev!,
                                gender: "FEMALE"
                            }))
                        }
                    }}
                        crossOrigin color="green" defaultChecked label="Male" />
                    <button
                        className="px-3 py-2 border border-green-300 ml-10 rounded-lg bg-green-500 text-white hover:bg-green-600"
                        onClick={() => setIsOpenPassword(!isOpenPassword)}
                    >
                        Change password
                    </button>
                </div>
            </div>

            {isOpenPassword && (
                <>
                    {/* Input Password */}
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                            Old Password
                        </label>
                        <div className="col-span-8 sm:col-span-4">
                            <input
                                onChange={(e) => setPassword((prev: {
                                    oldPassword: string,
                                    newPassword: string,
                                    comfirmNewPassword: string
                                }) => ({
                                    ...prev!,
                                    oldPassword: e.target.value
                                }))}
                                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                                type="password"
                                name="name"
                                placeholder="Old Password"
                            // value=""
                            />
                        </div>
                    </div>
                    {/* Input Password */}
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                            New Password
                        </label>
                        <div className="col-span-8 sm:col-span-4">
                            <input
                                onChange={(e) => setPassword((prev: {
                                    oldPassword: string,
                                    newPassword: string,
                                    comfirmNewPassword: string
                                }) => ({
                                    ...prev!,
                                    newPassword: e.target.value
                                }))}
                                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                                type="password"
                                name="name"
                                placeholder="New Password"
                            // value=""
                            />
                        </div>
                    </div>

                    {/* Input Confirm Password */}
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                            Confirm New Password
                        </label>
                        <div className="col-span-8 sm:col-span-4">
                            <input
                                onChange={(e) => setPassword((prev: {
                                    oldPassword: string,
                                    newPassword: string,
                                    comfirmNewPassword: string
                                }) => ({
                                    ...prev!,
                                    comfirmNewPassword: e.target.value
                                }))}
                                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                                type="password"
                                name="name"
                                placeholder="Confirm New Password"
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="flex flex-row-reverse pb-6">
                <button
                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm text-white bg-green-500 hover:bg-green-600 h-12"
                    type="submit"
                    onClick={handleEditProfile}
                >
                    {isLoading ? (
                        <p className="flex items-center justify-center">
                            <span className="mr-2">Update Profile</span>{" "}
                            <Spinner className="h-4 w-4" />
                        </p>
                    ) : (
                        <span>Update Profile</span>
                    )}
                </button>
            </div>
        </div>
    );
}
