import Cup from "@/components/SVG/Cup.svg"
import * as productApi from "@/api/adminApi/productApi/productApi"
import { configRouter } from "@/configs/router"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { formatVND } from "@/utils/helper"

interface IProductDetailContent {
    timestamp: string;
    success: boolean;
    message: string;
    data: {
        categoryId: string;
        description: string;
        id: string;
        imageUrl: string;
        name: string;
        sizeList?: {
            size: string;
            price: number;
        }[],
        status: string;
        toppingList?: {
            name: string;
            price: number;
        }[],
        type: string,
        price?: number
    }
}

function ProductDetailContent() {
    const [productDetail, setProductDetail] = useState<IProductDetailContent>()

    const { id } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const data = await productApi.getProductById(id as string)
                if (data?.success) {
                    setProductDetail(data)
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    nav(configRouter.home);
                    toast.error("Product not found with id: " + id);
                }
            }
        }
        id && getProductDetail()
    }, [id])

    return (
        <div className="mt-5">
            <div className="flex items-start justify-around mb-10">
                <div className="w-auto">
                    <img src={productDetail?.data?.imageUrl} alt="image product" className="w-142 h-142 object-contain bg-yellow-400" />
                </div>
                <div className="w-1/2">
                    <p className="font-semibold text-3xl">{productDetail?.data?.name}</p>
                    <p className="my-2 font-medium text-2xl text-yellow-500">{productDetail?.data?.type === "CAKE" ? formatVND(productDetail?.data?.price ? productDetail?.data?.price : 0) : formatVND((productDetail?.data?.sizeList && productDetail?.data?.sizeList[0]?.price) ? (productDetail?.data?.sizeList && productDetail?.data?.sizeList[0]?.price) : 0)}</p>
                    {productDetail?.data?.type !== "CAKE" &&
                        <div className="my-6">
                            <p className="font-medium">Size</p>
                            <div className="flex my-4">
                                {productDetail?.data?.sizeList?.map((size, index) => (
                                    <button id={size?.size} key={index}
                                        className={`flex items-center border border-gray-300 text-sm px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-gray-700 active:bg-select focus:text-gray-700 focus:bg-select`}
                                    >
                                        <Cup className={`w-${index + 4} h-${index + 4} mr-1`} />
                                        <p>{size.size} + {size.price} đ</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                    {productDetail?.data?.type !== "CAKE" &&
                        <div className="my-6">
                            {(productDetail?.success && productDetail?.data?.toppingList && productDetail?.data?.toppingList?.length > 0) && <p className="font-medium">Topping</p>}
                            <div className="flex my-4">
                                {productDetail?.data?.toppingList?.map((topping, index) => (
                                    <button
                                        id={topping?.name}
                                        key={index}
                                        className={`flex items-center border text-sm border-gray-300 px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-gray-700 active:bg-select `}
                                    >
                                        <p>{topping.name} + {topping.price} đ</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="border-y border-gray-200 py-8">
                <p className="font-semibold mb-3 text-md">Product Description</p>
                <p className="text-md">
                    {productDetail?.data?.description}
                </p>
            </div>
        </div >
    )
}

export default ProductDetailContent