import { Prohibit } from "@phosphor-icons/react";
import * as userApi from "@/api/adminApi/userApi/userApi";
import { useEffect, useState } from "react";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import FilterUser from "@/components/User/FilterUser";
import assets from "@/assets";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner,
} from "@material-tailwind/react";
import useLoading from "@/hooks/useLoading";
import { toast } from "react-toastify";

interface IResponseUser {
    timestamp: string;
    success: boolean;
    message: string;
    data: {
        totalPage: number;
        userList: IUser[];
    };
}
interface IUser {
    id: string;
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
    gender: string | null;
    birthDate: string | null;
    email: string;
    phoneNumber: string | null;
    status: string;
}

export default function Users() {
    const [users, setUsers] = useState<IResponseUser>();
    const [userId, setUserId] = useState<{
        userId: string,
        status: string
    }>({
        userId: "",
        status: ""
    });
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(!open);
    const { isLoading, startLoading, stopLoading } = useLoading()

    const getAllUser = async (key: string, page: number, status: string) => {
        const data = await userApi.getAllUser(key, page, status);
        setUsers(data);
    };

    useEffect(() => {
        getAllUser("", 1, "");
    }, []);

    const handleDelete = (userId: string, status: string) => {
        setOpen(prev => !prev)
        console.log(status)
        setUserId({
            userId: userId,
            status: status !== "ACTIVE" ? "ACTIVE" : "BLOCKED"
        })
    }

    const handleCancel = () => {
        setOpen(prev => !prev)
        setUserId({
            userId: "",
            status: ""
        })
    }

    const handleConfirm = async () => {
        try {
            startLoading()
            const data = await userApi.changeStatusUser(userId?.userId, userId?.status)
            if (data?.success) {
                setUserId({
                    userId: "",
                    status: ""
                })
                stopLoading()
                toast.success(data?.message)
                setOpen(prev => !prev)
                getAllUser("", 1, "")
            }
        }
        catch (err: any) {
            stopLoading()
            toast.error(err?.response?.data?.error?.subErrorMessage)
        }
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
                {/* Header order */}
                <div className="flex items-start justify-between mb-4">
                    <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Users</h1>
                </div>

                {/* Filter */}
                <FilterUser getAllUser={getAllUser} />

                {/* Table category */}
                <TableAdmin
                    fieldTable={[
                        "id",
                        "Full name",
                        "Avatar",
                        "Gender",
                        "birthDate",
                        "email",
                        "Phone",
                        "Status",
                        "actions",
                    ]}
                    data={users}
                    isPaging={true}
                    title="Orders"
                    getAllOrder={getAllUser}
                    scriptData={
                        <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
                            {users?.data?.userList?.map((user, i) => (
                                <tr key={i}>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{user.id}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{user?.firstName + " " + user?.lastName}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <img
                                            className="object-contain w-30 h-30 rounded-lg"
                                            src={user?.avatarUrl ? user?.avatarUrl : assets?.images?.noAvatar}
                                            alt="product"
                                            loading="lazy"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {user?.gender}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {user?.birthDate}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {user?.email}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {user?.phoneNumber}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.status === "ACTIVE" && (
                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                                                {user.status}
                                            </span>
                                        )}
                                        {user.status === "BLOCKED" && (
                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                                                {user.status}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        <div className="flex justify-end text-right">
                                            <button onClick={() => handleDelete(user.id, user?.status)} className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                                <p data-tip="true" data-for="edit" className="text-xl">
                                                    <Prohibit />
                                                </p>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                />
                <Dialog placeholder="" open={open} handler={handleOpen}>
                    <DialogHeader placeholder="">
                        {userId?.status === "BLOCKED"
                            ? "Confirm unblocking the user"
                            : "Confirm user blocking"}
                    </DialogHeader>
                    <DialogBody placeholder="">
                        When you{" "}
                        {userId?.status === "BLOCKED"
                            ? "'Confirm' unblock user"
                            : "'Confirm' block user"}{" "}
                        then the user will{" "}
                        {userId?.status !== "BLOCKED"
                            ? "Can't access the website anymore."
                            : "continue to access the website."}
                    </DialogBody>
                    <DialogFooter placeholder="">
                        <Button
                            placeholder=""
                            variant="text"
                            color="red"
                            onClick={handleCancel}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button placeholder="" variant="gradient" color="green" onClick={handleConfirm}>
                            {isLoading ? (
                                <p className="flex items-center justify-center">
                                    <span className="mr-2">
                                        Confirm
                                    </span>{" "}
                                    <Spinner className="h-4 w-4" />
                                </p>
                            ) : (
                                <span>Confirm</span>
                            )}
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </div >
    );
}
