import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Drawer,
  Switch,
} from "@material-tailwind/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";

export default function OurStaff() {
  const [openCreateCategory, setOpenCreateCategory] = useState<boolean>(false);

  const openDrawer = () => setOpenCreateCategory(true);
  const closeDrawer = () => setOpenCreateCategory(false);

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">
          Categorys
        </h1>

        {/* Model create category */}
        <Drawer
          placeholder=""
          placement="right"
          open={openCreateCategory}
          onClose={closeDrawer}
          size={700}
        >
          <button
            className="absolute focus:outline-none z-10 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
            onClick={closeDrawer}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="flex flex-col w-full h-full justify-between">
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex md:flex-row flex-col justify-between mr-20">
                <div>
                  <h4 className="text-xl font-medium">Add Staff</h4>
                  <p className="mb-0 text-sm">
                    Add your staff and necessary information from here
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
              {/* Input Username */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                  Username
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                    type="text"
                    name="name"
                    placeholder="Username"
                    value=""
                  />
                </div>
              </div>

              {/* Input FName */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                  First Name
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                    type="text"
                    name="name"
                    placeholder="First name"
                    value=""
                  />
                </div>
              </div>

              {/* Input LName */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                  Last Name
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                    type="text"
                    name="name"
                    placeholder="Last name"
                    value=""
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                  Password
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                    type="password"
                    name="name"
                    placeholder="Password"
                    // value=""
                  />
                </div>
              </div>

              {/* Input Birthday */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                  Birthday
                </label>

                <div className="col-span-8 sm:col-span-4">
                  <div className="w-full text-center">
                    <input
                      className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                      type="date"
                      name="joiningDate"
                      placeholder="Joining Date"
                    />
                  </div>
                </div>
              </div>

              {/* Choose status */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                  Gender
                </label>
                <div className="col-span-8 sm:col-span-4 flex">
                  <p className="opacity-80  mr-2">Female</p>
                  <Switch
                    crossOrigin
                    color="green"
                    defaultChecked
                    label="Male"
                  />
                </div>
              </div>
            </div>
            <div className="absolute z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <button
                  className="transition-colors duration-150 font-medium py-2 text-sm focus:outline-none rounded-lg border 
                  border-gray-200 px-4 mr-3 flex items-center justify-center cursor-pointer bg-white w-full text-red-500
                   hover:bg-red-50 hover:border-red-100 hover:text-red-600 
                   "
                  onClick={closeDrawer}
                >
                  Cancel
                </button>
              </div>
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <button
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent hover:bg-green-600 w-full"
                  type="submit"
                  onClick={closeDrawer}
                >
                  <span>Add Staff</span>
                </button>
              </div>
            </div>
          </div>
        </Drawer>

        {/* Filter */}
        <div className="min-w-0 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0 mb-4">
          <div className="py-2 px-4">
            <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <input
                  className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
                  type="search"
                  name="search"
                  placeholder="Search by name/email/phone"
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
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                    type="button"
                    onClick={openDrawer}
                  >
                    <span className="mr-2">
                      <Add />
                    </span>
                    Add Staff
                  </button>
                </div>
                <div className="w-full mx-1">
                  <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white  focus:border-gray-200 border-gray-200 focus:shadow-none leading-5">
                    <option value="Active">Active</option>
                    <option value="UnActive">Un Active</option>
                  </select>
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
        <TableOurStaff />
      </div>
    </div>
  );
}

const TableOurStaff = () => {
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
              <td className="px-4 py-2">ID</td>
              <td className="px-4 py-2">Username</td>
              <td className="px-4 py-2">First name</td>
              <td className="px-4 py-2">Last name</td>
              <td className="px-4 py-2">Gender</td>
              <td className="px-4 py-2">Status</td>
              <td className="px-4 py-2 text-right">ACTIONS</td>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-2">
                  <input
                    id="644501ab7094a0000851284b"
                    name="Premium T-Shirt"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">123456789</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">Testing123</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm font-semibold">A</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm font-normal w-40 max-w-40 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    Nguyen Van
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm font-semibold">Male</span>
                </td>
                <td className="px-4 py-2">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                    Enable
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
                    className={`${
                      i === 0
                        ? "bg-green-500 rounded-md"
                        : "hover:bg-gray-100 rounded-md"
                    }`}
                  >
                    <button
                      className={`${
                        i === 0 ? "bg-green-500 hover:bg-green-500" : ""
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
        <DialogHeader placeholder="">Confirm delete Staff</DialogHeader>
        <DialogBody placeholder="">
          Are you sure you want to delete this staff? This action cannot be
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
