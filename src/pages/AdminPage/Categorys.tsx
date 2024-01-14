import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { Export } from "@/components/SVG/Export.svg";
import { Import } from "@/components/SVG/Import.svg";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Drawer,
  Switch,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Categorys() {
  const [openCreateCategory, setOpenCreateCategory] = useState<boolean>(false);

  const openDrawer = () => setOpenCreateCategory(true);
  const closeDrawer = () => setOpenCreateCategory(false);

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">
          Categorys
        </h1>

        {/* Add and delete */}
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
          <div className="p-4">
            <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center">
              <div className="flex-grow-0 sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow">
                <div className=" lg:flex md:flex flex-grow-0">
                  <div className="flex">
                    <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                      <button className="border flex justify-center items-center border-gray-300 hover:border-green-400 hover:text-green-400 cursor-pointer h-10 w-20 rounded-md focus:outline-none">
                        <Export />
                        <span className="text-xs">Export</span>
                      </button>
                    </div>
                    <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
                      <button className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                        <Import />
                        <span className="text-xs">Import</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <button
                    className="inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-emerald-500 border border-transparent opacity-100 w-full rounded-md h-12 bg-red-600"
                    type="button"
                  >
                    <span className="mr-2">
                      <Delete />
                    </span>
                    Delete
                  </button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <button
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                    type="button"
                    onClick={openDrawer}
                  >
                    <span className="mr-2">
                      <Add />
                    </span>
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                  <h4 className="text-xl font-medium">Add Category</h4>
                  <p className="mb-0 text-sm">
                    Add your Product category and necessary information from
                    here
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
              {/* Input Name */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                  Name
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                    type="text"
                    name="name"
                    placeholder="Category title"
                    value=""
                  />
                </div>
              </div>

              {/* Input Image */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                  Category Image
                </label>

                <div className="col-span-8 sm:col-span-4">
                  <div className="w-full text-center">
                    <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
                      <input
                        accept="image/*,.jpeg,.jpg,.png,.webp"
                        type="file"
                        className="hidden"
                      />
                      <span className="mx-auto flex justify-center">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                      <p className="text-sm mt-2">Drag your images here</p>
                      <em className="text-xs text-gray-400">
                        (Only *.jpeg, *.webp and *.png images will be accepted)
                      </em>
                    </div>
                    <div className="text-emerald-500"></div>
                    <aside className="flex flex-row flex-wrap mt-4"></aside>
                  </div>
                </div>
              </div>

              {/* Choose status */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
                  Published
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <Switch crossOrigin color="green" defaultChecked />
                </div>
              </div>
            </div>
            <div className="relative z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
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
                  <span>Add Category</span>
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
                  placeholder="Search Category"
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
        <TableCategorys />
      </div>
    </div>
  );
}

const TableCategorys = () => {
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
              <td className="px-4 py-2">NAME</td>
              <td className="px-4 py-2">Image</td>
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
                  <span className="text-sm">Coffe</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">Coffe</span>
                </td>
                <td className="px-4 py-2">
                  <img
                    className="object-contain w-20 h-20 rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/shopfee-12b03.appspot.com/o/product%2Fcoffee1.png?alt=media&token=274503e4-9efd-4649-aba5-781e457932cb"
                    alt="product"
                    loading="lazy"
                  />
                </td>
                <td className="px-4 py-2">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                    Publish
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
      {/* Confirm Delete */}
      <Dialog placeholder="" open={open} handler={handleOpen}>
        <DialogHeader placeholder="">Confirm delete Category</DialogHeader>
        <DialogBody placeholder="">
          Are you sure you want to delete this category? This action cannot be
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
