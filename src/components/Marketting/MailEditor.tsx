import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5/build/ckeditor';
import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate, useParams } from 'react-router-dom';
import { configRouter } from '@/configs/router';
import { Spinner } from '@material-tailwind/react';
import useLoading from '@/hooks/useLoading';
import { checkTypeImage, imageUrlToFile } from '@/utils/helper';
import { toast } from 'react-toastify';
import * as marketingApi from "@/api/adminApi/marketingApi/marketingApi"

interface IDataBlog {
    status: string,
    title: string,
    summary: string,
    content: string,
    image: File[]
}

const EmailEditor: React.FC = () => {
    const [dataBlog, setDataBlog] = useState<IDataBlog>({
        status: "VISIBLE",
        title: "",
        summary: "",
        content: "",
        image: []
    });
    const nav = useNavigate();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { id } = useParams()

    const handleRedirectMarketings = () => {
        nav(configRouter.marketing);
    };

    const handleContentChange = (event: any, editor: any) => {
        console.log(event)
        const data = editor.getData();
        setDataBlog((prev: IDataBlog) => (
            {
                ...prev,
                content: data
            }
        ))
    };

    const handleAddProduct = async () => {
        if (dataBlog?.content !== "" && dataBlog?.title !== "" && dataBlog?.summary !== "" && dataBlog?.status !== "" && dataBlog?.image?.length > 0) {
            startLoading();
            let formData = new FormData();
            formData.append("title", dataBlog?.title);
            formData.append("status", dataBlog?.status);
            formData.append("summary", dataBlog?.summary);
            formData.append("content", dataBlog?.content);
            dataBlog?.image?.forEach((img) => {
                formData.append("image", img);
            });
            try {
                if (!id) {
                    const data = await marketingApi.addBlog(
                        formData
                    );
                    if (data?.success) {
                        stopLoading();
                        toast.success(data?.message);
                        nav(configRouter.marketing);
                    }
                }
                else {
                    const data = await marketingApi.editBlog(
                        formData, id as string
                    );
                    if (data?.success) {
                        stopLoading();
                        toast.success(data?.message);
                        nav(configRouter.marketing);
                    }
                }
            } catch (err: any) {
                stopLoading();
                toast.error(err?.response?.data?.error?.errorMessage);
            }
        } else {
            toast.error("Please fill out all fields completely");
        }
    };

    const getBlogDetail = async () => {
        try {
            const data = await marketingApi.getAllBlogById(
                id as string
            );
            if (data?.success) {
                setDataBlog(data?.data)
                handleImageAdd(data?.data?.imageUrl)
            }
        } catch (err: any) {
            nav(configRouter.marketing)
            toast.error(err?.response?.data?.error?.subErrorMessage);
        }
    }

    const handleImageAdd = async (imageUrl: string) => {
        const file = await imageUrlToFile(imageUrl);
        if (file) {
            setDataBlog((prev: IDataBlog) => (
                {
                    ...prev,
                    image: [...dataBlog?.image, file]
                }
            ))
        } else {
            console.log("Failed to convert image URL to file");
        }
    };

    useEffect(() => {
        id && getBlogDetail()
    }, [id])

    return (
        <div className="w-full h-auto min-h-full overflow-auto">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
                        onClick={handleRedirectMarketings}
                    >
                        <ArrowLeft />
                    </div>
                    <p className="text-lg font-semibold">
                        {location.pathname.split("/")[2].split("-")[0] === "add"
                            ? "Add"
                            : "Edit"}{" "}
                        Blog
                    </p>
                </div>
                <div>
                    <button
                        className="px-4 py-2 bg-green-400 rounded-full text-white"
                        onClick={handleAddProduct}
                    >
                        {isLoading ? (
                            <p className="flex items-center justify-center">
                                <span className="mr-2">Save</span>{" "}
                                <Spinner className="h-4 w-4" />
                            </p>
                        ) : (
                            <span>Save</span>
                        )}
                    </button>
                </div>
            </div>
            <div className="w-full h-auto flex">
                {/* Setting*/}
                <div className={`w-[70%] flex flex-col`}>
                    <div className="w-full mx-auto p-4 border rounded-lg shadow-lg bg-white">
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-lg font-bold text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="Enter Title"
                                value={dataBlog?.title}
                                onChange={(e) => setDataBlog((prev: IDataBlog) => (
                                    {
                                        ...prev,
                                        title: e.target.value
                                    }
                                ))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-lg font-bold text-gray-700">
                                Description
                            </label>
                            <textarea
                                onChange={(e) => setDataBlog((prev: IDataBlog) => (
                                    {
                                        ...prev,
                                        summary: e.target.value
                                    }
                                ))}
                                value={dataBlog?.summary}
                                className="block w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2 min-h-20 h-40 max-h-60"
                                placeholder="Enter Desciption"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-bold text-gray-700">
                                Content
                            </label>
                            <CKEditor
                                editor={Editor}
                                data={dataBlog?.content}
                                onChange={handleContentChange}
                            />
                        </div>
                    </div>
                </div>

                {/* status and overview */}
                <div className="w-[30%] flex flex-col ml-4">
                    <div className="w-full h-auto bg-white rounded-xl p-3">
                        <div>
                            <p className="mb-3 font-normal text-sm">Status</p>
                            <select
                                className="w-full rounded-xl text-base"
                                onChange={(e) => setDataBlog((prev: IDataBlog) => (
                                    {
                                        ...prev,
                                        status: e.target.value
                                    }
                                ))}
                                value={dataBlog?.status}
                            >
                                <option value="VISIBLE">VISIBLE</option>
                                <option value="HIDDEN">HIDDEN</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full h-auto bg-white rounded-xl mt-4">
                        <div className="mt-2 w-full h-auto bg-white rounded-xl p-3">
                            <label className="block mb-3 w-full text-gray-800 font-medium text-sm">
                                Thumnail Blog
                            </label>
                            <div className="w-full">
                                <div className="w-full text-center">
                                    <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
                                        <input
                                            accept="image/.jpeg,.jpg,.png"
                                            type="file"
                                            id="file"
                                            className="hidden"
                                            onChange={e => {
                                                if (e.target.files) {
                                                    if (checkTypeImage(e.target.files)) {
                                                        setDataBlog((prev: IDataBlog) => (
                                                            {
                                                                ...prev,
                                                                image: [...(e.target.files as FileList)]
                                                            }
                                                        ))
                                                    }
                                                    else {
                                                        toast.error("Only *.jpeg, *.jpg and *.png images will be accepted");
                                                    }
                                                }
                                            }}
                                        />
                                        <label htmlFor="file" className="cursor-pointer">
                                            {dataBlog?.image?.length > 0 ? (
                                                <img
                                                    src={URL.createObjectURL(dataBlog?.image[0])}
                                                    alt="image-category"
                                                    className="w-full h-60 object-contain"
                                                />
                                            ) : (
                                                <>
                                                    <span className="mx-auto flex justify-center">
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-3xl text-green-500"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <polyline points="16 16 12 12 8 16"></polyline>
                                                            <line x1="12" y1="12" x2="12" y2="21"></line>
                                                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                                            <polyline points="16 16 12 12 8 16"></polyline>
                                                        </svg>
                                                    </span>
                                                    <p className="text-sm mt-2">
                                                        Choose your images here
                                                    </p>
                                                    <em className="text-xs text-gray-400">
                                                        (Only *.jpeg, *.jpg and *.png images will be
                                                        accepted)
                                                    </em>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailEditor;
