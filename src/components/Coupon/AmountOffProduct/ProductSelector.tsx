import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import * as productApi from "@/api/adminApi/productApi/productApi"
import { ICoupon, IProduct } from '@/types/type';

interface IProductSelector {
    couponData: ICoupon,
    setCouponData: React.Dispatch<React.SetStateAction<ICoupon>>
}

function ProductSelector(props: IProductSelector) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [productSearch, setProductSearch] = useState<IProduct[]>([])

    const handleSearchProduct = async (key: string) => {
        const data = await productApi.searchProduct(key, 1, "", "")
        setProductSearch(data?.data?.productList)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchProduct(e.target.value)
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
    };

    const handleOpenModel = () => setModalOpen(prev => !prev)

    const handleCheckboxChange = (productId: string, checked: boolean) => {
        const updatedCouponData = { ...props.couponData };
        if (checked) {
            updatedCouponData.subjectConditionList = [
                ...(updatedCouponData.subjectConditionList || []),
                { objectId: productId, value: 1 }
            ];
        } else {
            updatedCouponData.subjectConditionList = (updatedCouponData.subjectConditionList || []).filter(obj => obj.objectId !== productId);
        }
        props.setCouponData(updatedCouponData);
    };

    useEffect(() => {
        handleSearchProduct("")
    }, [])

    return (
        <div className="flex flex-col items-start">
            <p className="mb-3 font-semibold text-sm">Applies to</p>
            <div className='flex w-full items-center'>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer z-999999">
                        {/* MagnifyingGlass component */}
                        <span>&#128269;</span>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter product ..."
                        onChange={() => {
                            setModalOpen(true)
                            handleSearchProduct("")
                        }}
                    />
                </div>
                <button className='px-4 py-1.5 rounded-lg shadow-sm border font-medium ml-5 hover:bg-gray-50' onClick={() => {
                    setModalOpen(true)
                    handleSearchProduct("")
                }}>Browse</button>
            </div>
            <Dialog placeholder="" open={modalOpen} handler={handleOpenModel}>
                <DialogHeader placeholder="">Add Product</DialogHeader>
                <DialogBody placeholder="">
                    <div className="w-full text-center">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer z-999999">
                                <span>&#128269;</span>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter product ..."
                                onChange={handleInputChange}
                            />
                        </div>
                        {productSearch.map((product, index) => (
                            <div key={index} className="w-full h-auto min-h-10 border my-2 rounded-lg flex items-center p-2">
                                <input
                                    type="checkbox"
                                    checked={props.couponData.subjectConditionList?.some(obj => obj.objectId === product.id)}
                                    onChange={() => handleCheckboxChange(product.id, !props.couponData.subjectConditionList?.some(obj => obj.objectId === product.id))}
                                />
                                <img src={product?.thumbnailUrl} alt="img test" loading="lazy" className="ml-3 w-12 h-12 object-cover border rounded-md" />
                                <div className="text-sm ml-3">
                                    <p className="font-semibold">{product?.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter placeholder="">
                    <Button
                        placeholder=""
                        variant="text"
                        color="red"
                        onClick={() => setModalOpen(false)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button placeholder="" variant="gradient" color="green" onClick={handleModalConfirm}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default ProductSelector;
