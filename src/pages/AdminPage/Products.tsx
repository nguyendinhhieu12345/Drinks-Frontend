import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { configRouter } from "@/configs/router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as productApi from "@/api/adminApi/productApi/productApi";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import { ICategory, IProduct } from "@/types/type";
import { formatVND } from "@/utils/helper";
import * as categoryApi from "@/api/adminApi/categoryApi/categoryApi";
import { toast } from "react-toastify";
import AddProductFile from "@/components/Product/AddProductFile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import { Rating, Tooltip } from "@material-tailwind/react";

interface IProductsResponse {
    timestamp: string;
    success: boolean;
    message: string;
    data: {
        totalPage: number;
        productList: IProduct[];
    };
}

const columnTable = ["id", "name", "Min price", "Image", "Status", "Status Branch", "Reviews", "actions"]

export default function Products() {
    const [products, setProducts] = useState<IProductsResponse>();
    const [status, setStatus] = useState<string>("");
    const [category, setCategory] = useState<ICategory[]>([]);
    const [categoryId, setCategoryId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [productDeleteId, setProductDeleteId] = useState<string>("");
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const nav = useNavigate();

    const getAllCategory = async () => {
        const data = await categoryApi.getAllCategory();
        setCategory([...data?.data]);
        setCategoryId(data?.data[0]?.id);
    };

    const getAllProduct = async (
        key: string,
        page: number,
        productStatus: string,
        categoryId: string
    ) => {
        if (useCurrentUser && useCurrentUser?.success && useCurrentUser?.data?.branchId) {
            const data = await productApi.getAllProduct(
                key,
                page,
                productStatus,
                categoryId,
                useCurrentUser?.data?.branchId
            );
            setProducts(data);
        }
        else {
            const data = await productApi.getAllProduct(
                key,
                page,
                productStatus,
                categoryId
            );
            setProducts(data);
        }
    };

    useEffect(() => {
        getAllProduct("", 1, "", "");
        getAllCategory();
    }, []);

    // Redirect add product
    const handleRedirectAddProduct = () => {
        nav(configRouter.addProduct);
    };

    // Redirect edit product
    const handleRedirectEditProduct = (productId: string) => {
        nav(`/admin/edit-product/${productId}`);
    };

    const handleSeachProduct = async () => {
        getAllProduct(search, 1, status, categoryId);
    };

    const handleResetProduct = async () => {
        setStatus("ACTIVE");
        getAllProduct("", 1, "", "");
    };

    // Open confirm delete
    const handleOpen = () => setOpen(!open);

    const handleDelete = (e: string) => {
        setOpen(!open);
        setProductDeleteId(e);
    };

    const handleDeleteProduct = async () => {
        setOpen(!open);
        try {
            const data = await productApi.deleteProduct(productDeleteId);
            if (data?.success) {
                toast.success(data?.message);
                getAllProduct("", 1, "", "");
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleGetAllReviews = (productId: string) => {
        nav(configRouter?.reviewProduct.slice(0, -3) + productId)
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
                <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Products</h1>

                {/* Add and delete */}
                <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
                    <div className="p-4">
                        <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center">
                            <AddProductFile getAllProduct={getAllProduct} />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                    <button
                                        className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                                        type="button"
                                        onClick={handleRedirectAddProduct}
                                    >
                                        <span className="mr-2">
                                            <Add />
                                        </span>
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="min-w-0 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0 mb-4">
                    <div className="py-2 px-4">
                        <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <input
                                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
                                    type="search"
                                    name="search"
                                    placeholder="Search Product"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 mt-5 mr-1"
                                ></button>
                            </div>
                            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <select
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white  focus:border-gray-200 border-gray-200 focus:shadow-none leading-5"
                                >
                                    {category?.map((cate, index) => (
                                        <option key={index} value={cate.id}>
                                            {cate.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <select
                                    className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white  focus:border-gray-200 border-gray-200 focus:shadow-none leading-5"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">IN ACTIVE</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <div className="w-full mx-1">
                                    <button
                                        className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 h-12 w-full"
                                        type="submit"
                                        onClick={handleSeachProduct}
                                    >
                                        Filter
                                    </button>
                                </div>
                                <div className="w-full mx-1">
                                    <button
                                        className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                                        type="reset"
                                        onClick={handleResetProduct}
                                    >
                                        <span className="text-black ">Reset</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table product */}
                <TableAdmin
                    fieldTable={!useCurrentUser?.data?.branchId ? columnTable?.filter(prev => prev !== "Status Branch") : columnTable}
                    data={products}
                    isPaging={true}
                    title="Product"
                    getAllProduct={getAllProduct}
                    scriptData={
                        <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
                            {products?.data?.productList?.map((prod, i) => (
                                <tr key={i}>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{prod.id}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">{prod.name}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {formatVND(prod.price)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <img
                                            className="object-contain w-30 h-30 rounded-lg"
                                            src={prod.thumbnailUrl}
                                            alt="product"
                                            loading="lazy"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        {prod.status === "ACTIVE" && (
                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                                                {prod.status}
                                            </span>
                                        )}
                                        {prod.status === "INACTIVE" && (
                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                                                {prod.status}
                                            </span>
                                        )}
                                    </td>

                                    {
                                        useCurrentUser?.data?.branchId &&
                                        <td className="px-4 py-2">
                                            {prod.branchProductStatus === "AVAILABLE" && (
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                                                    {prod.branchProductStatus}
                                                </span>
                                            )}
                                            {prod.branchProductStatus === "UNAVAILABLE" && (
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                                                    {prod.branchProductStatus}
                                                </span>
                                            )}
                                        </td>
                                    }

                                    <td className="px-4 py-2">
                                        <Tooltip content="Click see all reviews">
                                            <button onClick={() => handleGetAllReviews(prod?.id)} className="text-sm font-semibold">
                                                <Rating placeholder="" value={prod?.ratingSummary?.star} readonly ratedColor="amber" className="w-2 h-2 my-1" />
                                            </button>
                                        </Tooltip>
                                    </td>

                                    <td className="px-4 py-2">
                                        <div className="flex justify-end text-right">
                                            <button
                                                className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                                onClick={() => handleRedirectEditProduct(prod?.id)}
                                            >
                                                <p data-tip="true" data-for="edit" className="text-xl">
                                                    <Edit />
                                                </p>
                                            </button>
                                            {
                                                !useCurrentUser?.data?.branchId &&
                                                <button
                                                    className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                                    onClick={() => handleDelete(prod.id)}
                                                >
                                                    <p
                                                        data-tip="true"
                                                        data-for="delete"
                                                        className="text-xl"
                                                    >
                                                        <Delete />
                                                    </p>
                                                </button>
                                            }
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
                    title="Product"
                    handleDelete={handleDeleteProduct}
                />
            </div>
        </div>
    );
}
