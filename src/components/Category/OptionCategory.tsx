import { Export } from "@phosphor-icons/react";
import { Add } from "../SVG/Add.svg";
import { Delete } from "../SVG/Delete.svg";
import { Import } from "../SVG/Import.svg";

interface IOptionCategory {
  handleAddCate: () => void;
}

function OptionCategory(props: IOptionCategory) {
  return (
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
                onClick={props?.handleAddCate}
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
  );
}

export default OptionCategory;
