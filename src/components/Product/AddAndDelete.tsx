import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import { Add } from "../SVG/Add.svg"
import AddProductFile from "./AddProductFile"
import { Import } from "../SVG/Import.svg"
// import * as productApi from "@/api/adminApi/productApi/productApi"
import axios, { AxiosError } from "axios"
import { toastError } from "@/utils/helper"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { User } from "@/type"
import { BASE_URL } from "@/configs/environment"

interface IAddAndDelete {
    getAllProduct: (key: string, page: number, productStatus: string, categoryId: string) => Promise<void>,
    handleRedirectAddProduct: () => void
}

function AddAndDelete({ getAllProduct, handleRedirectAddProduct }: IAddAndDelete) {
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const handleOpen = async (type: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/product/download/import-file?product_type=${type}`, {
                responseType: 'blob', // Quan trọng để nhận dữ liệu dưới dạng Blob
                headers: {
                    'Authorization': `Bearer ${useCurrentUser?.data?.accessToken}` // Nếu bạn cần gửi token xác thực
                }
            });

            // Tạo một Blob từ dữ liệu nhận được
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            const contentDisposition = response.headers['content-disposition'];
            let fileName = `product_${type}.xlsx`;
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/);
                if (match[1]) {
                    fileName = match[1];
                }
            }
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                toastError(e, "top-right")
            }
        }
    }

    return (
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
            <div className="p-4">
                <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center">
                    <AddProductFile getAllProduct={getAllProduct} />
                    <Menu>
                        <MenuHandler>
                            <button className="border flex justify-center items-center h-10 w-auto px-5 hover:text-yellow-400  border-gray-300cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                                <Import />
                                <span className="text-xs">DownLoad File Example</span>
                            </button>
                        </MenuHandler>
                        <MenuList placeholder="">
                            <MenuItem placeholder="" className="flex item-center font-semibold text-black opacity-90" onClick={() => handleOpen("BEVERAGE")}><Import />Beverage</MenuItem>
                            <MenuItem placeholder="" className="flex item-center font-semibold text-black opacity-90" onClick={() => handleOpen("CAKE")}><Import />Cake</MenuItem>
                        </MenuList>
                    </Menu>
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
    )
}

export default AddAndDelete