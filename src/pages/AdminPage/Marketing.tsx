import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { configRouter } from "@/configs/router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as marketingApi from "@/api/adminApi/marketingApi/marketingApi"
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import { toast } from "react-toastify";

interface IResponseBlog {
    timestamp: string;
    success: boolean;
    message: string;
    data: {
        totalPage: number;
        blogList: {
            id: string;
            title: string;
            summary: string;
            thumbnailUrl: string;
            createdAt: string;
        }[]
    };
}

export default function Marketing() {
    const [open, setOpen] = useState<boolean>(false);
    const nav = useNavigate();
    const [blogs, setBlogs] = useState<IResponseBlog>()
    const [dataDelete, setDataDelete] = useState<string>("");

    const handleRedirectCreateCampain = () => {
        nav(configRouter.addMarketting);
    };

    const handleOpen = () => setOpen(!open);

    const getAllMarketing = async () => {
        const data = await marketingApi.getAllBlog(1);
        if (data?.success)
            setBlogs(data);
    };

    const handleDeleteCate = async () => {
        setOpen(!open);
        try {
            const data = await marketingApi.deleteBlog(dataDelete);
            if (data?.success) {
                toast.success(data?.message);
                getAllMarketing();
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.error?.errorMessage);
        }
    };

    const handleDelete = (e: string) => {
        setOpen(!open);
        setDataDelete(e);
    };

    useEffect(() => {
        getAllMarketing();
    }, []);

    return (
        <div className="h-full overflow-y-auto">
            <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
                <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">
                    Marketing
                </h1>

                {/* Add and delete */}
                <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
                    <div className="p-4">
                        <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center xl:justify-end">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                    <button
                                        className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                                        type="button"
                                        onClick={handleRedirectCreateCampain}
                                    >
                                        <span className="mr-2">
                                            <Add />
                                        </span>
                                        Add campaign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <TableAdmin
                    fieldTable={["id", "title", "image", "actions"]}
                    data=""
                    isPaging={false}
                    title="Blog"
                    scriptData={
                        <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
                            {blogs?.data?.blogList?.map((blog, i) => (
                                <tr key={i}>
                                    <>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">{blog.id}</span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">{blog.title}</span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <img
                                                className="object-contain w-20 h-20 rounded-lg"
                                                src={blog.thumbnailUrl}
                                                alt="product"
                                                loading="lazy"
                                            />
                                        </td>
                                    </>

                                    <td className="px-4 py-2">
                                        <div className="flex justify-end text-right">
                                            <button
                                                onClick={() => nav(configRouter?.editMarketting.slice(0, -3) + blog?.id)}
                                                className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                            >
                                                <p data-tip="true" data-for="edit" className="text-xl">
                                                    <Edit />
                                                </p>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
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
                <TableConfirmDelete
                    open={open}
                    handleOpen={handleOpen}
                    title="Blog"
                    handleDelete={handleDeleteCate}
                />
            </div>
        </div>
    );
}