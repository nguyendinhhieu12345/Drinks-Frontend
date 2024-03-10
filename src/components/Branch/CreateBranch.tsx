import useLoading from "@/hooks/useLoading";
import { Spinner } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import * as ortherApi from "@/api/adminApi/ortherApi/ortherApi";
import { configRouter } from "@/configs/router";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import * as branchApi from "@/api/adminApi/branchApi/branchApi";
import { checkTypeImage, imageUrlToFile } from "@/utils/const";

interface IProvince {
  province_id: string;
  province_name: string;
  province_type: string;
}

interface IDistrict {
  district_id: string;
  district_name: string;
  district_type: string;
  lat: number | null;
  lng: number | null;
  province_id: string;
}

interface IWard {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}

export interface INewBranch {
  image: File[];
  province: string;
  district: string;
  ward: string;
  detail: string;
  name: string;
  phoneNumber: string;
  longitude: number;
  latitude: number;
  openTime: string;
  closeTime: string;
  status?: string;
}

function CreateBranch() {
  const [newBranch, setNewBranch] = useState<INewBranch>({
    province: "",
    district: "",
    ward: "",
    detail: "",
    phoneNumber: "",
    name: "",
    longitude: 0,
    latitude: 0,
    openTime: "",
    closeTime: "",
    image: [],
  });
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [province, setProvince] = useState<IProvince[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [ward, setWard] = useState<IWard[]>([]);
  const nav = useNavigate();
  const { id } = useParams();

  const handleImageAdd = async (imageUrl: string) => {
    const file = await imageUrlToFile(imageUrl);
    if (file) {
      setNewBranch((prevState: INewBranch) => ({
        ...prevState,
        ["image"]: [file],
      }));
    } else {
      console.log("Failed to convert image URL to file");
    }
  };

  const getBranchDetail = async () => {
    try {
      const data = await branchApi.getBranchById(id as string);
      if (data?.success) {
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["province"]: data?.data?.province,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["phoneNumber"]: data?.data?.phoneNumber,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["name"]: data?.data?.name,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["district"]: data?.data?.district,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["ward"]: data?.data?.ward,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["detail"]: data?.data?.detail,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["closeTime"]: data?.data?.closeTime,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["openTime"]: data?.data?.openTime,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["status"]: data?.data?.status,
        }));
        handleImageAdd(data?.data?.imageUrl);
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["longitude"]: data?.data?.longitude,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["latitude"]: data?.data?.latitude,
        }));
      }
      console.log(data);
    } catch {
      toast.error("Branch not found!");
      nav(configRouter.branchs);
    }
  };

  const getAllProvince = async () => {
    const data = await ortherApi.getAllProvince();
    setProvince(data?.data?.results);
  };

  const getAllDistrict = async (province_id: string) => {
    const data = await ortherApi.getAllDistrict(province_id);
    setDistrict(data?.data?.results);
  };

  const getAllWard = async (district_id: string) => {
    const data = await ortherApi.getAllWard(district_id);
    setWard(data?.data?.results);
  };

  const handleChangeProvinces = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewBranch((prevState: INewBranch) => ({
      ...prevState,
      ["province"]: event.target.value.split(",")[1],
    }));
    getAllDistrict(event.target.value.split(",")[0]);
  };

  const handleChangeDistrict = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewBranch((prevState: INewBranch) => ({
      ...prevState,
      ["district"]: event.target.value.split(",")[1],
    }));
    getAllWard(event.target.value.split(",")[0]);
  };

  const handleChangeWard = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewBranch((prevState: INewBranch) => ({
      ...prevState,
      ["ward"]: event.target.value.split(",")[1],
    }));
  };

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (checkTypeImage(e.target.files)) {
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["image"]: [...(e.target.files as FileList)],
        }));
      } else {
        toast.error("Only *.jpeg, *.jpg and *.png images will be accepted");
      }
    }
  };

  useEffect(() => {
    getAllProvince();
    if (id) {
      getBranchDetail();
    }
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ): void => {
    const { value } = event.target;
    setNewBranch((prevState: INewBranch) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleRedirectBranchs = () => {
    nav(configRouter.branchs);
  };

  const handleGetLatLong = async () => {
    const API_KEY = "2tgHvZJswyFkLug62ynzpCrs8RlqMcmzFVtoUjEL";
    const encodedAddress = encodeURIComponent(
      newBranch.detail +
        " " +
        newBranch.ward +
        " " +
        newBranch.district +
        " " +
        newBranch.province
    );
    const url = `https://rsapi.goong.io/Geocode?address=${encodedAddress}&api_key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry?.location;
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["longitude"]: lng,
        }));
        setNewBranch((prevState: INewBranch) => ({
          ...prevState,
          ["latitude"]: lat,
        }));
      } else {
        toast.error("Address not found");
      }
    } catch (error) {
      console.error("Error geocoding:", error);
      toast.error("Error geocoding");
    }
  };

  const handleUpdateBranchs = async () => {
    try {
      if (
        newBranch.name.trim() !== "" &&
        newBranch.province.trim() !== "" &&
        newBranch.district.trim() !== "" &&
        newBranch.ward.trim() !== "" &&
        newBranch.detail.trim() !== "" &&
        newBranch.phoneNumber.trim() !== "" &&
        newBranch.openTime.trim() !== "" &&
        newBranch.closeTime.trim() !== ""
      ) {
        handleGetLatLong();
        let formData = new FormData();
        formData.append("name", newBranch.name);
        formData.append("province", newBranch.province);
        formData.append("district", newBranch.district);
        formData.append("ward", newBranch.ward);
        formData.append("detail", newBranch.detail);
        formData.append("longitude", newBranch.longitude.toString());
        formData.append("latitude", newBranch.latitude.toString());
        formData.append("openTime", newBranch.openTime + ":00");
        formData.append("closeTime", newBranch.closeTime + ":00");
        formData.append("phoneNumber", newBranch.phoneNumber);
        newBranch.image.forEach((img) => {
          formData.append("image", img);
        });
        if (!id) {
          startLoading();
          const data = await branchApi.addBranch(formData);
          if (data.success) {
            toast.success(data.message);
            nav(configRouter.branchs);
            stopLoading();
          } else {
            stopLoading();
            toast.error(data.message);
          }
        } else {
          formData.append("status", newBranch?.status as string);
          startLoading();
          const data = await branchApi.updateBranch(formData, id);
          if (data.success) {
            toast.success(data.message);
            nav(configRouter.branchs);
            stopLoading();
          } else {
            stopLoading();
            toast.error(data.message);
          }
        }
      } else {
        stopLoading();
        toast.error("Please fill out all fields completely");
      }
    } catch (err: any) {
      stopLoading();
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col w-full h-auto overflow-y-auto justify-between">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
            onClick={handleRedirectBranchs}
          >
            <ArrowLeft />
          </div>
          <p className="text-lg font-semibold">
            {location.pathname.split("/")[2].split("-")[0] === "add"
              ? "Add"
              : "Edit"}{" "}
            Branch
          </p>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-green-400 rounded-full text-white"
            onClick={handleUpdateBranchs}
          >
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
      <div className="w-full h-auto flex">
        <div className="w-full flex flex-col">
          {/* Enter information product */}
          <div className="w-full h-auto bg-white rounded-xl p-3">
            <div className="mb-3">
              <p className="mb-3 font-normal text-sm">Name</p>
              <input
                className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                type="text"
                placeholder="Branch name"
                onChange={(e) => handleInputChange(e, "name")}
                value={newBranch?.name}
              />
            </div>
            <div className="mb-3">
              <p className="mb-3 font-normal text-sm">Phone</p>
              <input
                className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                type="text"
                placeholder="Phone"
                onChange={(e) => handleInputChange(e, "phoneNumber")}
                value={newBranch?.phoneNumber}
              />
            </div>
            <div className="mb-3">
              <p className="mb-3 font-normal text-sm">Time open and start</p>
              <div className="flex items-center justify-center">
                <input
                  className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="time"
                  placeholder="Time start"
                  onChange={(e) => handleInputChange(e, "openTime")}
                  value={newBranch?.openTime}
                />
                <ArrowRight size={28} />
                <input
                  className="block w-[30%] h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="time"
                  placeholder="Time end"
                  onChange={(e) => handleInputChange(e, "closeTime")}
                  value={newBranch?.closeTime}
                />
              </div>
            </div>
            {id && (
              <div className="w-full h-auto bg-white rounded-xl">
                <p className="mb-3 font-normal text-sm">Status</p>
                <select
                  className="w-full rounded-xl text-base"
                  onChange={(e) => {
                    setNewBranch((prevState: INewBranch) => ({
                      ...prevState,
                      ["status"]: e.target.value,
                    }));
                  }}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">InActive</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Enter image product */}
      <div className="mt-6 w-full h-auto bg-white rounded-xl p-3">
        <label className="block mb-3 w-full text-gray-800 font-medium text-sm">
          Image branch
        </label>
        <div className="w-full">
          <div className="w-full text-center">
            <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
              <input
                accept="image/.jpeg,.jpg,.png"
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => {
                  handleInputImage(e);
                }}
              />
              <label htmlFor="file" className="cursor-pointer">
                {newBranch.image.length > 0 ? (
                  <img
                    src={URL.createObjectURL(newBranch.image[0])}
                    alt="image-category"
                    className="w-full h-60 object-contain"
                  />
                ) : (
                  <>
                    <span className="mx-auto flex justify-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                    <p className="text-sm mt-2">Choose your images here</p>
                    <em className="text-xs text-gray-400">
                      (Only *.jpeg, *.jpg and *.png images will be accepted)
                    </em>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg mt-3 flex flex-col w-full h-auto justify-between overflow-y-auto">
        <div className="p-3 flex-grow scrollbar-hide w-full max-h-full pb-40">
          {/* Input Province */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              Province
            </label>
            <div className="col-span-8 sm:col-span-4">
              <select
                className="mt-3 rounded-md w-full border-slate-400 hover:border-slate-900 focus:border-sky-600"
                onChange={(e) => handleChangeProvinces(e)}
                defaultValue={
                  newBranch?.province === ""
                    ? "Choose province"
                    : newBranch?.province
                }
              >
                <option disabled>Choose province</option>
                {province?.map((dt) => (
                  <option
                    key={dt?.province_id}
                    value={[dt.province_id, dt.province_name]}
                  >
                    {dt?.province_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input District */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              District
            </label>
            <div className="col-span-8 sm:col-span-4">
              <select
                className="mt-3 rounded-md w-full border-slate-400 hover:border-slate-900 focus:border-sky-600"
                onChange={(e) => handleChangeDistrict(e)}
                defaultValue={"Choose district"}
              >
                <option disabled>Choose district</option>
                {district?.map((dt, index) => (
                  <option
                    key={index}
                    value={[dt?.district_id, dt?.district_name]}
                  >
                    {dt?.district_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input Ward */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              Ward
            </label>
            <div className="col-span-8 sm:col-span-4">
              <select
                className="mt-3 rounded-md w-full border-slate-400 hover:border-slate-900 focus:border-sky-600"
                onChange={(e) => handleChangeWard(e)}
                defaultValue={"Choose ward"}
              >
                <option disabled>Choose ward</option>
                {ward?.map((dt, index) => (
                  <option key={index} value={[dt?.ward_id, dt?.ward_name]}>
                    {dt?.ward_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input Village */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              No.
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                name="Village"
                placeholder="No."
                onChange={(e) => handleInputChange(e, "detail")}
                value={newBranch?.detail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBranch;
