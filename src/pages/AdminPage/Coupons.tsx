import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import { configRouter } from "@/configs/router";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import *  as couponApi from "@/api/adminApi/couponApi/couponApi"
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import { toast } from "react-toastify";

interface ICoupons {
  timestamp: string;
  success: boolean;
  message: string;
  data: {
    id: string;
    code: string;
    couponType: string;
    status: string;
    isExpired: boolean
  }[]
}

export default function Coupons() {
  const [open, setOpen] = useState<boolean>(false);
  const nav = useNavigate()
  const [coupons, setCoupons] = useState<ICoupons>()
  const [isDelete, setIsDelete] = useState<{
    open: boolean,
    couponId: string;
  }>({
    open: false,
    couponId: ""
  })

  const getCoupons = async () => {
    const data = await couponApi.getAllCoupon()
    setCoupons(data)
  }

  useEffect(() => {
    getCoupons()
  }, [])

  const handleRedirect = (type: string) => {
    if (type === "Amount off product") {
      nav(configRouter.couponAmountOfProduct)
    }
    else if (type === "Buy X get Y") {
      nav(configRouter.couponBuyXGetY)
    } else if (type === "Amount off order") {
      nav(configRouter.couponAmountOfOrder)
    }
    else {
      nav(configRouter.couponShipping)
    }
  }

  const handleOpen = () => setOpen(!open);

  const handleOpenDelete = () => {
    setIsDelete({
      open: false,
      couponId: ""
    })
  }

  const handleDeleteCoupon = async () => {
    try {
      const data = await couponApi.deleteCoupon(isDelete?.couponId as string)
      if (data?.success) {
        setIsDelete({
          open: false,
          couponId: ""
        })
        getCoupons()
        toast.success(data?.success)
      }
    }
    catch (err: any) {
      setIsDelete({
        open: false,
        couponId: ""
      })
      toast.error(err?.response?.data?.message)
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Coupons</h1>

        {/* Add and delete */}
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
          <div className="p-4 flex items-center justify-end">
            <button
              className="mr-2 inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-emerald-500 border border-transparent opacity-100 rounded-md h-12 bg-red-600"
              type="button"
            >
              <span className="mr-2">
                <Delete />
              </span>
              Delete
            </button>
            <button
              className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent rounded-md h-12"
              type="button"
              onClick={handleOpen}
            >
              <span className="mr-2">
                <Add />
              </span>
              Add Coupon
            </button>
          </div>
        </div>

        <Dialog placeholder="" open={open} handler={handleOpen}>
          <DialogHeader placeholder="">
            <Typography placeholder="" variant="h5" color="blue-gray">
              Select discount type
            </Typography>
          </DialogHeader>
          <DialogBody placeholder="" className="px-4 py-0">
            <button className="text-start text-sm  border-y w-full py-2" onClick={() => handleRedirect("Amount off product")}>
              <p className="font-normal text-black">Amount off product</p>
              <p>Discount specific products or collections of products.</p>
            </button>
            <button className="text-start text-sm  border-y w-full py-2" onClick={() => handleRedirect("Buy X get Y")}>
              <p className="font-normal text-black">Buy X get Y</p>
              <p>Discount products based on a customer’s purchase.</p>
            </button>
            <button className="text-start text-sm  border-y w-full py-2" onClick={() => handleRedirect("Amount off order")}>
              <p className="font-normal text-black">Amount off order</p>
              <p>Discount the total order amount.</p>
            </button>
            <button className="text-start text-sm  border-y w-full py-2" onClick={() => handleRedirect("Shipping")}>
              <p className="font-normal text-black">Shipping</p>
              <p>Offer shipping on an order.</p>
            </button>
          </DialogBody>
          <DialogFooter placeholder="" className="space-x-2">
            <Button placeholder="" variant="text" color="blue-gray" onClick={handleOpen} className="border">
              close
            </Button>
          </DialogFooter>
        </Dialog>

        <TableAdmin
          fieldTable={["id", "code", "couponType", "status", "expired", "actions"]}
          data={coupons}
          isPaging={false}
          title="Coupon"
          scriptData={
            <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
              {coupons?.data?.map((coupon, i) => (
                <tr key={i}>
                  <>
                    <td className="px-4 py-2">
                      <span className="text-sm">{coupon.id}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{coupon.code}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{coupon.couponType}</span>
                    </td>
                    <td className="px-4 py-2">
                      {coupon.status === "UNRELEASED" ? (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                          UNRELEASED
                        </span>
                      ) : (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                          Publish
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {coupon.isExpired ? (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                          Expired
                        </span>
                      ) : (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                          Publish
                        </span>
                      )}
                    </td>
                  </>

                  <td className="px-4 py-2">
                    <div className="flex justify-end text-right">
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                        onClick={() => setIsDelete({
                          open: true,
                          couponId: coupon.id
                        })}
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
          open={isDelete.open}
          handleOpen={handleOpenDelete}
          title="Coupon"
          handleDelete={handleDeleteCoupon}
        />
      </div>
    </div>
  );
}