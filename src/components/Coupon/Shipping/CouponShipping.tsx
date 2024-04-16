import { configRouter } from "@/configs/router";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as couponApi from "@/api/adminApi/couponApi/couponApi"
import { ICoupon } from "@/types/type";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";
import { Spinner } from "@material-tailwind/react";
import { getToday } from "@/utils/helper";

function CouponShipping() {
    const [couponData, setCouponData] = useState<ICoupon>({
        code: "",
        description: "",
        unitReward: "PERCENTAGE",
        valueReward: 0,
        startDate: getToday(),
        expirationDate: ""
    })
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { id } = useParams()

    const nav = useNavigate();
    const handleRedirectCoupons = () => {
        nav(configRouter.coupons);
    };

    const handleAddCouponShipping = async () => {
        try {
            startLoading()
            if (couponData?.code !== "" && couponData?.description !== "" && couponData?.unitReward !== "" && couponData?.startDate !== "" && couponData?.valueReward !== 0) {
                if (!id) {
                    const data = await couponApi.addCouponShipping(couponData as ICoupon)
                    if (data?.success) {
                        stopLoading()
                        toast.success(data?.message)
                        handleRedirectCoupons()
                    }
                }
                else {
                    const { id, ...orthers } = couponData
                    const data = await couponApi.updateCouponShipping(orthers, id as string)
                    if (data?.success) {
                        stopLoading()
                        toast.success(data?.message)
                        handleRedirectCoupons()
                    }
                }
            }
            else {
                stopLoading()
                toast.error("Please fill out all fields completely")
            }
        }
        catch (err: any) {
            stopLoading()
            toast.error(err?.response?.data?.message)
        }
    }

    const handleCheckboxChange = (type: string) => {
        setCouponData(prev => {
            const typeExists = prev.combinationConditionList?.some(item => item.type === type);

            if (typeExists) {
                const updatedList = prev.combinationConditionList?.filter(item => item.type !== type);
                return { ...prev, combinationConditionList: updatedList };
            }
            else {
                return {
                    ...prev,
                    combinationConditionList: [
                        ...(prev.combinationConditionList || []),
                        { type: type }
                    ]
                };
            }
        });
    };

    const handleCheckBoxUsageConditionList = (type: string) => {
        setCouponData(prev => {
            const typeExists = prev.usageConditionList?.some(item => item.type === type);

            if (typeExists) {
                const updatedList = prev.usageConditionList?.filter(item => item.type !== type);
                return { ...prev, usageConditionList: updatedList };
            }
            else {
                return {
                    ...prev,
                    usageConditionList: [
                        ...(prev.usageConditionList || []),
                        { type: type }
                    ]
                };
            }
        });
    }

    useEffect(() => {
        const getCouponDetail = async () => {
            try {
                const data = await couponApi.getCouponShipping(id as string)
                if (data?.success) {
                    console.log(data?.data)
                    setCouponData(data?.data)
                }
            }
            catch {
                nav(configRouter.coupons)
                toast.error("Coupon not found")
            }
        }
        id && getCouponDetail()
    }, [id])

    return (
        <div className="w-full h-auto min-h-full overflow-auto py-3 px-8 ">
            {/* Save */}
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
                        onClick={handleRedirectCoupons}
                    >
                        <ArrowLeft />
                    </div>
                    <p className="text-lg font-semibold">{id ? "Edit" : "Create"} shipping discount</p>
                </div>
                <div>
                    <button onClick={handleAddCouponShipping} className="px-4 py-2 bg-green-400 rounded-full text-white">
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
            {/* Input data  */}
            <div className="w-full h-auto flex">
                <div className="w-[65%] flex flex-col">
                    {/* code and description */}
                    <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
                        <div className="mb-3">
                            <p className="mb-3 font-semibold text-sm">Code</p>
                            <input
                                onChange={(e) => setCouponData((prev: any) => ({
                                    ...prev,
                                    code: e.target.value
                                }))}
                                className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                                type="text"
                                placeholder="Title"
                                value={couponData?.code}
                            />
                        </div>
                        <div className="mb-2">
                            <p className="mb-3 font-semibold text-sm">Description</p>
                            <textarea
                                onChange={(e) => setCouponData((prev: any) => ({
                                    ...prev,
                                    description: e.target.value
                                }))}
                                className="block w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2 min-h-20 h-40 max-h-60"
                                placeholder="Desciption"
                                value={couponData?.description}
                            />
                        </div>
                    </div>
                    {/* reward and value */}
                    <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
                        <div className="mb-3">
                            <p className="mb-3 font-semibold text-sm">Discount Value</p>
                            <div className="flex items-center">
                                <select value={couponData?.unitReward} className="w-[70%] mr-2 text-base rounded-lg"
                                    onChange={(e) => setCouponData((prev: any) => ({
                                        ...prev,
                                        unitReward: e.target.value
                                    }))}>
                                    <option className="text-base" value="PERCENTAGE">
                                        Percenatge
                                    </option>
                                    <option className="text-base" value="MONEY">
                                        Fixed amount
                                    </option>
                                </select>
                                <input
                                    onChange={(e) => setCouponData((prev: any) => ({
                                        ...prev,
                                        valueReward: e.target.value
                                    }))}
                                    value={couponData?.valueReward}
                                    className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                                    type="number"
                                    placeholder="Value discount"
                                />
                            </div>
                        </div>
                        {/* usageConditionList */}
                        <div className="mb-3">
                            <p className="mb-3 font-semibold text-sm">Maximum discount uses</p>
                            <div className="flex flex-col items-start justify-center">
                                <div className="flex flex-col items-start justify-center mt-2">
                                    <div className="flex flex-col items-start justify-center" >
                                        <div className="flex items-center justify-center">
                                            <input type="checkbox" className="rounded-md"
                                                onChange={() => handleCheckBoxUsageConditionList("QUANTITY")}
                                                checked={couponData.usageConditionList?.some(item => item.type === "QUANTITY")}
                                            />
                                            <p className="text-sm ml-2">Limit number of times this discount can be used in total</p>
                                        </div>
                                        {couponData.usageConditionList?.some(item => item.type === "QUANTITY") &&
                                            <input
                                                className="block w-1/2 border ml-10 px-1 text-sm rounded-md focus:bg-white border-gray-600"
                                                type="number"
                                                value={couponData?.usageConditionList?.filter(item => item.type === "QUANTITY")[0]?.value}
                                                disabled={!couponData.usageConditionList?.some(item => item.type === "QUANTITY")}
                                                onChange={(e) => {
                                                    setCouponData((prev: any) => ({
                                                        ...prev,
                                                        usageConditionList: prev.usageConditionList?.map((item: any) => {
                                                            if (item.type === "QUANTITY") {
                                                                return {
                                                                    ...item,
                                                                    value: parseInt(e.target.value)
                                                                };
                                                            }
                                                            return item;
                                                        }) || [{ type: "QUANTITY", value: parseInt(e.target.value) }]
                                                    }));
                                                }}
                                            />
                                        }
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <input type="checkbox" className="rounded-md"
                                            onChange={() => handleCheckBoxUsageConditionList("LIMIT_ONE_FOR_USER")}
                                            checked={couponData.usageConditionList?.some(item => item.type === "LIMIT_ONE_FOR_USER")}
                                        />
                                        <p className="text-sm ml-2">Limit to one use per customer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* combinationConditionList */}
                    <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
                        <div className="mb-3">
                            <p className="mb-3 font-semibold text-sm">Combinations</p>
                            <div className="flex items-center justify-around mt-3">
                                <div className="flex items-center justify-center">
                                    <input type="checkbox" className="rounded-md"
                                        onChange={() => handleCheckboxChange("PRODUCT")}
                                        checked={couponData.combinationConditionList?.some(item => item.type === "PRODUCT")}
                                    />
                                    <p className="text-sm ml-2">Product discounts</p>
                                </div>
                                <div className="flex items-center justify-center" >
                                    <input type="checkbox" className="rounded-md"
                                        onChange={() => handleCheckboxChange("ORDER")}
                                        checked={couponData.combinationConditionList?.some(item => item.type === "ORDER")}
                                    />
                                    <p className="text-sm ml-2">Order discounts</p>
                                </div>
                            </div>
                        </div>
                        {/* Date start and end */}
                        <div className="mb-3">
                            <p className="mb-3 font-semibold text-sm">Date start and end</p>
                            <div className="flex items-center justify-center mt-3">
                                <input
                                    onChange={(e) => setCouponData((prev: any) => ({
                                        ...prev,
                                        startDate: e.target.value
                                    }))}
                                    className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                                    type="date"
                                    placeholder="Date start"
                                    value={couponData?.startDate.split("T00")[0]}
                                />
                                <ArrowRight size={20} />
                                <input
                                    onChange={(e) => setCouponData((prev: any) => ({
                                        ...prev,
                                        expirationDate: e.target.value
                                    }))}
                                    className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                                    type="date"
                                    placeholder="Date end"
                                    value={couponData?.expirationDate ? couponData?.expirationDate?.split("T00")[0] : ""}
                                    min={getToday()}
                                />
                            </div>
                        </div>
                        {/* minPurchaseCondition */}
                        <div className="mb-2">
                            <p className="mb-3 font-semibold text-sm">Min price to apply discount (₫)</p>
                            <input
                                onChange={(e) => setCouponData((prev: any) => ({
                                    ...prev,
                                    minPurchaseCondition: {
                                        value: e.target.value
                                    }
                                }))}
                                value={couponData?.minPurchaseCondition?.value}
                                type="number"
                                className="block w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2 h-10"
                                placeholder="Min price to apply discount"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[35%] flex flex-col ml-4 mt-3">
                    <div className="w-full h-auto bg-white rounded-xl p-3">
                        <p className="font-semibold text-lg">Overview</p>
                        <p className="my-2">Code: {couponData?.code}</p>
                        <p className="mb-2 break-all">Desciption: {couponData?.description}</p>
                        <p className="mb-2 break-all">Discount value: {couponData?.unitReward} - {couponData?.valueReward}{couponData?.unitReward === "MONEY" ? "₫" : "%"}</p>
                        <p className="mb-2 break-all">Start date: {couponData?.startDate}</p>
                        <p className="mb-2 break-all">Min price: {couponData?.minPurchaseCondition?.value}₫</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CouponShipping;
