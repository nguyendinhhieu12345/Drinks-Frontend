import assets from "@/assets";
import { configRouter } from "@/configs/router";
import { Radio } from "@material-tailwind/react";
import { ArrowLeft, ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CouponBuyXGetY() {
  const [isShowInput, setIsShowInput] = useState<{
    purchase: boolean,
    quantity: boolean,
    LimitNumber: boolean
  }>({ purchase: true, quantity: false, LimitNumber: false })

  const nav = useNavigate();
  const handleRedirectCoupons = () => {
    nav(configRouter.coupons);
  };

  return (
    <div className="w-full h-auto min-h-full overflow-auto py-3 px-8 ">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
            onClick={handleRedirectCoupons}
          >
            <ArrowLeft />
          </div>
          <p className="text-lg font-semibold">Create product gift discount</p>
        </div>
        <div>
          <button className="px-4 py-2 bg-green-400 rounded-full text-white">
            Save
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex">
        <div className="w-[65%] flex flex-col">
          {/* Code and description */}
          <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
            <div className="mb-3">
              <p className="mb-3 text-sm font-semibold">Code</p>
              <input
                className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="mb-2">
              <p className="mb-3 font-semibold text-sm">Description</p>
              <textarea
                className="block w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2 min-h-20 h-40 max-h-60"
                placeholder="Desciption"
              />
            </div>
          </div>

          {/* unitReward and value */}
          <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
            <div className="mb-3">
              <p className="mb-3 font-semibold text-sm">Discount Value</p>
              <div className="flex items-center">
                <select className="w-[70%] mr-2 text-base rounded-lg">
                  <option className="text-base">
                    Percenatge
                  </option>
                  <option className="text-base">
                    Fixed amount
                  </option>
                </select>
                <input
                  className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="text"
                  placeholder="Value discount"
                />
              </div>
            </div>

            {/* productRewardList */}
            <div className="mb-3">
              <p className="mb-3 font-semibold text-sm">Customer gets - Customers must add the quantity of items specified below to their cart.</p>
              <div className="flex items-center">
                <div className="relative w-96">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer z-999999">
                    <MagnifyingGlass />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Enter product ..."
                  />
                </div>
              </div>
              <div>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="w-full h-auto min-h-10 border my-2 rounded-lg flex p-2">
                    <img src={assets?.images?.shopfeeIcon} alt="img test" loading="lazy" className="w-10 h-10 object-cover border rounded-md" />
                    <div className="text-sm ml-3">
                      <p className="font-semibold">Coffe size M</p>
                      <p className="text-xs">Coffe size M</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* usageConditionList */}
            <div className="mb-3">
              <p className="mb-3 font-semibold text-sm">Minimum purchase requirements</p>
              <div className="flex flex-col items-start justify-center">
                <Radio onChange={() => setIsShowInput({
                  LimitNumber: false,
                  quantity: false,
                  purchase: true
                })
                } crossOrigin="true" name="type" color="blue" label="Minimum purchase amount (₫)" defaultChecked
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0" />
                {isShowInput?.purchase && <input
                  className="block w-[30%] ml-10 border px-2 text-sm rounded-md focus:bg-white border-gray-600"
                  type="text"
                />}
                <Radio onChange={() => setIsShowInput({
                  LimitNumber: false,
                  quantity: true,
                  purchase: false
                })} crossOrigin="true" name="type" color="blue" label="Minimum quantity of items" className="text-xs" />
                {isShowInput?.quantity && <input
                  className="block w-[30%] ml-10 border px-2 text-sm rounded-md focus:bg-white border-gray-600"
                  type="text"
                />}
              </div>
            </div>
          </div>
          {/* combinationConditionList */}
          <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
            <div className="mb-3">
              <p className="mb-3 font-semibold text-sm">Combinations</p>
              <div className="flex items-center justify-around mt-3">
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="rounded-md" />
                  <p className="text-sm ml-2">Product discounts</p>
                </div>
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="rounded-md" />
                  <p className="text-sm ml-2">Order discounts</p>
                </div>
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="rounded-md" />
                  <p className="text-sm ml-2">Shipping discounts</p>
                </div>
              </div>
            </div>
            {/* time open and close */}
            <div className="mb-3">
              <p className="mb-3 font-semibold text-sm">Date start and end</p>
              <div className="flex items-center justify-center mt-3">
                <input
                  className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="date"
                  placeholder="Date start"
                />
                <ArrowRight size={20} />
                <input
                  className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="date"
                  placeholder="Date end"
                />
              </div>
            </div>
            {/* minPurchaseCondition */}
            <div className="mb-2">
              <p className="mb-3 font-semibold text-sm">Min price to apply discount (₫)</p>
              <input
                type="text"
                className="block h-10 w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                placeholder="Min price to apply discount"
              />
            </div>
          </div>
          {/* targetObjectConditionList */}
          <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
            <div className="mb-3">
              <p className="mb-3 font-semibold text-sm">Maximum discount uses</p>
              <div className="flex flex-col items-start justify-around ml-3 mt-3">
                <div className="flex items-center justify-center mb-3">
                  <input type="checkbox" className="rounded-md" onChange={(e) => {
                    if (e.target.checked) {
                      setIsShowInput((prev: any) => ({
                        ...prev,
                        LimitNumber: true
                      }))
                    }
                  }} />
                  <p className="text-sm ml-2">Limit number of times this discount can be used in total</p>
                </div>
                {isShowInput?.LimitNumber && <input
                  className="block w-[30%] ml-10 border px-2 text-sm rounded-md focus:bg-white border-gray-600"
                  type="text"
                />}
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="rounded-md" />
                  <p className="text-sm ml-2">Limit to one use per customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[35%] flex flex-col ml-4">
          <div className="w-full h-auto bg-white rounded-xl p-3">Overview</div>
        </div>
      </div>
    </div >
  );
}

export default CouponBuyXGetY;
