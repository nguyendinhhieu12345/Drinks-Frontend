import { useState } from "react";

interface IFilterOrder {
  getAllOrder: (key: string, page: number, status: string) => Promise<void>;
}

function FilterOrder(props: IFilterOrder) {
  const [dateFilter, setDataFilter] = useState<{
    key: string;
    status: string;
  }>({
    key: "",
    status: "CREATED",
  });
  return (
    <div className="min-w-0 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0 mb-4">
      <div className="py-2 px-4">
        <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex flex-wrap">
          <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <input
              className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
              type="search"
              name="search"
              placeholder="Search by customer name"
              onChange={(e) => {
                setDataFilter((prev: any) => ({
                  ...prev,
                  key: e.target.value,
                }));
              }}
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
                onClick={() =>
                  props?.getAllOrder(dateFilter?.key, 1, dateFilter?.status)
                }
              >
                Filter
              </button>
            </div>
            <div className="w-full mx-1">
              <select
                className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white  focus:border-gray-200 border-gray-200 focus:shadow-none leading-5"
                onChange={(e) => {
                  setDataFilter((prev: any) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
              >
                <option value="CREATED">CREATED</option>
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="CANCELLATION_REQUEST">
                  CANCELLATION_REQUEST
                </option>
                <option value="CANCELLATION_REQUEST_REFUSED">
                  CANCELLATION_REQUEST_REFUSED
                </option>
                <option value="CANCELLATION_REQUEST_ACCEPTED">
                  CANCELLATION_REQUEST_ACCEPTED
                </option>
                <option value="DELIVERING">DELIVERING</option>
                <option value="CANCELED">CANCELED</option>
                <option value="SUCCEED">SUCCEED</option>
              </select>
            </div>
            <div className="w-full mx-1">
              <button
                className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                type="reset"
                onClick={() => props?.getAllOrder("", 1, "")}
              >
                <span className="text-black ">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterOrder;
