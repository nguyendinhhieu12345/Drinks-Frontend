import useLoading from "@/hooks/useLoading";
import { IBranch } from "@/types/type";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as branchApi from "@/api/adminApi/branchApi/branchApi";
import { toast } from "react-toastify";

interface ICreateBranch {
  setOpenCreateBranch: React.Dispatch<React.SetStateAction<boolean>>;
  currentBranch?: IBranch | null;
  branchs?: IBranch[];
  type?: string;
}

function CreateBranch(props: ICreateBranch) {
  const [provinceSelect, setProvinceSelect] = useState<string>("");
  const [districtSelect, setDistrictSelect] = useState<string>("");
  const [wardsSelect, setWardSelect] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (props.type === "edit" && props.currentBranch) {
      setProvinceSelect(props?.currentBranch?.province);
      setDistrictSelect(props?.currentBranch?.district);
      setWardSelect(props?.currentBranch?.ward);
      setDetail(props?.currentBranch?.detail);
      setPhone(parseInt(props?.currentBranch?.phoneNumber));
    }
  }, []);

  const handleClose = () => {
    props.setOpenCreateBranch(false);
  };

  const handleAddBranch = async () => {
    try {
      startLoading();
      if (
        provinceSelect !== "" &&
        districtSelect !== "" &&
        wardsSelect !== "" &&
        detail !== "" &&
        phone !== 0
      ) {
        if (props?.type !== "edit") {
          const data = await branchApi.addBranch(
            provinceSelect,
            districtSelect,
            wardsSelect,
            detail,
            1,
            1,
            phone
          );
          if (data.success) {
            toast.success(data?.message);
            stopLoading();
            props.setOpenCreateBranch(false);
          }
        } else {
          const data = await branchApi.updateBranch(
            provinceSelect,
            districtSelect,
            wardsSelect,
            detail,
            props?.currentBranch?.id as string
          );
          if (data.success) {
            toast.success(data?.message);
            stopLoading();
            props.setOpenCreateBranch(false);
          }
        }
      } else {
        toast.error("Please fill out all fields completely!", {
          position: "bottom-left",
        });
        stopLoading();
      }
    } catch (err: any) {
      stopLoading();
      toast.error(err?.response?.data?.message, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
        <div className="flex md:flex-row flex-col justify-between mr-20">
          <div>
            <h4 className="text-xl font-medium">
              {props?.type === "edit" ? "Edit" : "Add"} Branch
            </h4>
            <p className="mb-0 text-sm">
              {props?.type === "edit" ? "Edit" : "Add"} your branch and
              necessary information from here
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full justify-between overflow-y-auto">
        <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
          {/* Input Province */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              Province
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                type="text"
                name="Province"
                placeholder="Province"
                onChange={(e) => setProvinceSelect(e.target.value)}
                value={provinceSelect}
              />
            </div>
          </div>

          {/* Input District */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              District
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                type="text"
                name="District"
                placeholder="District"
                onChange={(e) => setDistrictSelect(e.target.value)}
                value={districtSelect}
              />
            </div>
          </div>

          {/* Input Ward */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              Ward
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                type="text"
                name="Ward"
                placeholder="Ward"
                onChange={(e) => setWardSelect(e.target.value)}
                value={wardsSelect}
              />
            </div>
          </div>

          {/* Input Village */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              Village
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                name="Village"
                placeholder="Village"
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
              />
            </div>
          </div>

          {/* Phone */}
          {props.type !== "edit" && (
            <div
              className={`grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6`}
            >
              <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                Phone
              </label>
              <div className="col-span-8 sm:col-span-4">
                <input
                  className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                  name="Phone"
                  type="number"
                  placeholder="Phone"
                  onChange={(e) => setPhone(parseInt(e.target.value))}
                  value={phone}
                />
              </div>
            </div>
          )}
        </div>
        <div className="absolute z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
          <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <button
              className="transition-colors duration-150 font-medium py-2 text-sm focus:outline-none rounded-lg border 
                  border-gray-200 px-4 mr-3 flex items-center justify-center cursor-pointer bg-white w-full text-red-500
                   hover:bg-red-50 hover:border-red-100 hover:text-red-600 
                   "
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
          <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <button
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent hover:bg-green-600 w-full"
              type="submit"
              onClick={handleClose}
            >
              <span>Add Branch</span>
            </button>
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
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <button
            className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent hover:bg-green-600 w-full"
            type="submit"
            onClick={handleAddBranch}
          >
            {isLoading ? (
              <p className="flex items-center justify-center">
                <span className="mr-2">
                  {props?.type === "edit" ? "Edit" : "Add"} Branch
                </span>{" "}
                <Spinner className="h-4 w-4" />
              </p>
            ) : (
              <span>{props?.type === "edit" ? "Edit" : "Add"} Branch</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBranch;
