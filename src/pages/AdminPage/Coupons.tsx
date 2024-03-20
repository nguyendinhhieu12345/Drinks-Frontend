import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { configRouter } from "@/configs/router";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Typography
} from "@material-tailwind/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Coupons() {
  const [open, setOpen] = useState<boolean>(false);
  const nav = useNavigate()

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

        {/* Filter */}
        <div className="min-w-0 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0 mb-4">
          <div className="py-2 px-4">
            <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <input
                  className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
                  type="search"
                  name="search"
                  placeholder="Search Coupon"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-5 mr-1"
                ></button>
              </div>
              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <button
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 h-12 w-full"
                    type="submit"
                  >
                    Filter
                  </button>
                </div>
                <div className="w-full mx-1">
                  <button
                    className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                    type="reset"
                  >
                    <span className="text-black ">Reset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table category */}
        <TableCoupons />
      </div>
    </div>
  );
}

const TableCoupons = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = () => {
    setOpen(!open);
  };

  const handleOpen = () => setOpen(!open);

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
      {/* table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
            <tr>
              <td className="px-4 py-2">
                <input id="selectAll" name="selectAll" type="checkbox" />
              </td>
              <td className="px-4 py-2">CODE</td>
              <td className="px-4 py-2">DISCOUNT</td>
              <td className="px-4 py-2">PUBLISHED</td>
              <td className="px-4 py-2">START DATE</td>
              <td className="px-4 py-2">END DATE</td>
              <td className="px-4 py-2">STATUS</td>
              <td className="px-4 py-2 text-right">ACTIONS</td>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-2">
                  <input
                    id="644501ab7094a0000851284b"
                    name="Premium T-Shirt"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">WINTER24</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">10%</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">
                    <Switch crossOrigin defaultChecked color="green" />
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">Jan 18, 2024</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">Jan 18, 2024</span>
                </td>

                <td className="px-4 py-2">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                    Active{" "}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <div className="flex justify-end text-right">
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                      <p data-tip="true" data-for="edit" className="text-xl">
                        <Edit />
                      </p>
                    </button>
                    <button
                      className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                      onClick={handleDelete}
                    >
                      <p data-tip="true" data-for="delete" className="text-xl">
                        <Delete />
                      </p>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* paging */}
      <div className="px-4 py-3 border-t border-gray-200  bg-white text-gray-500 ">
        <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 ">
          <span className="flex items-center font-semibold tracking-wide uppercase">
            Showing 1-10 of 500
          </span>
          <div className="flex mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Product Page Navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                    type="button"
                    aria-label="Previous"
                  >
                    <CaretLeft size={12} />
                  </button>
                </li>
                {Array.from({ length: 5 }).map((_, i) => (
                  <li
                    key={i}
                    className={`${i === 0
                      ? "bg-green-500 rounded-md"
                      : "hover:bg-gray-100 rounded-md"
                      }`}
                  >
                    <button
                      className={`${i === 0 ? "bg-green-500 hover:bg-green-500" : ""
                        }inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 border border-transparent `}
                      type="button"
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                    type="button"
                    aria-label="Next"
                  >
                    <CaretRight size={12} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Confirm Delete */}
      <Dialog placeholder="" open={open} handler={handleOpen}>
        <DialogHeader placeholder="">Confirm delete Coupon</DialogHeader>
        <DialogBody placeholder="">
          Are you sure you want to delete this coupon? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter placeholder="">
          <Button
            placeholder=""
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOpen}
            placeholder=""
            variant="gradient"
            color="green"
            className="cursor-pointer"
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
