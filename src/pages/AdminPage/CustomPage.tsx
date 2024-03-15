import InputEditTitle from "@/components/InputWrap/InputEditTitle";
import { checkTypeImage } from "@/utils/const";
import { Carousel, Spinner } from "@material-tailwind/react";
import { Gear } from "@phosphor-icons/react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as bannerApi from "@/api/adminApi/bannerApi/bannerApi";
import useLoading from "@/hooks/useLoading";
interface BannerLinks {
  banner1: IBanner;
  banner2: IBanner;
  banner3: IBanner;
}

interface IBanner {
  name: string;
  image: File[];
  isEdit: boolean;
}

export default function CustomPage() {
  const [bannerLinks, setBannerLinks] = useState<BannerLinks>({
    banner1: {
      name: "Banner1",
      image: [],
      isEdit: false,
    },
    banner2: {
      name: "Banner2",
      image: [],
      isEdit: false,
    },
    banner3: {
      name: "Banner3",
      image: [],
      isEdit: false,
    },
  });
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSaveBanner = async () => {
    startLoading();
    if (bannerLinks?.banner1?.isEdit) {
      let banner1 = new FormData();
      banner1.append("name", bannerLinks?.banner1?.name);
      bannerLinks?.banner1?.image.forEach((img) => {
        banner1.append("image", img);
      });
      try {
        const data = await bannerApi.addBanner(banner1);
        if (data?.success) {
          stopLoading();
          toast.success("Add banner 1 success");
        }
      } catch (err: any) {
        stopLoading();
        toast.error(
          "Error when update banner 1: " + err?.response?.data?.message
        );
      }
    }
    if (bannerLinks?.banner2?.isEdit) {
      let banner2 = new FormData();
      banner2.append("name", bannerLinks?.banner2?.name);
      bannerLinks?.banner2?.image.forEach((img) => {
        banner2.append("image", img);
      });
      try {
        const data = await bannerApi.addBanner(banner2);
        if (data?.success) {
          stopLoading();
          toast.success("Add banner 2 success");
        }
      } catch (err: any) {
        stopLoading();
        toast.error(
          "Error when update banner 2: " + err?.response?.data?.message
        );
      }
    }
    if (bannerLinks?.banner3?.isEdit) {
      let banner3 = new FormData();
      banner3.append("name", bannerLinks?.banner3?.name);
      bannerLinks?.banner3?.image.forEach((img) => {
        banner3.append("image", img);
      });
      try {
        const data = await bannerApi.addBanner(banner3);
        if (data?.success) {
          stopLoading();
          toast.success("Add banner 3 success");
        }
      } catch (err: any) {
        stopLoading();
        toast.error(
          "Error when update banner 3: " + err?.response?.data?.message
        );
      }
    }
    stopLoading();
  };

  useEffect(() => {
    const getAllBanner = async () => {
      const data = await bannerApi.getAllBanner();
      console.log(data);
    };
    getAllBanner();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="flex items-center my-3 justify-between">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Banner</h1>
        {bannerLinks && (
          <button
            className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            onClick={handleSaveBanner}
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
        )}
      </div>
      <div className="w-full h-80">
        <Carousel placeholder="" className="rounded-xl">
          <img src="" alt="image 1" className="h-full w-full object-cover" />
          <img src="" alt="image 2" className="h-full w-full object-cover" />
          <img src="" alt="image 3" className="h-full w-full object-cover" />
        </Carousel>
      </div>
      <div className="rounded-lg h-auto min-w-0 shadow-xs bg-white my-5 p-4">
        <div className="flex items-center md:text-lg text-base text-gray-800 font-semibold mb-3">
          <Gear size={23} />
          <p className="ml-3">Edit your banner</p>
        </div>
        <hr className="md:mb-4 mb-3"></hr>
        <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
          <div className="h-auto transition-all duration-500 ease-in-out visibility-visible opacity-100">
            <CustomBanner
              bannerLinks={bannerLinks}
              setBannerLinks={setBannerLinks}
              positionBanner={1}
            />
            <CustomBanner
              bannerLinks={bannerLinks}
              setBannerLinks={setBannerLinks}
              positionBanner={2}
            />
            <CustomBanner
              bannerLinks={bannerLinks}
              setBannerLinks={setBannerLinks}
              positionBanner={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ICustomBanner {
  bannerLinks: BannerLinks;
  setBannerLinks: React.Dispatch<React.SetStateAction<BannerLinks>>;
  positionBanner: number;
}

const CustomBanner: FC<ICustomBanner> = (props) => {
  const returnData = () => {
    if (props.positionBanner === 1) {
      return {
        ...props.bannerLinks.banner1,
        key: "banner1",
      };
    } else if (props.positionBanner === 2) {
      return {
        ...props.bannerLinks.banner2,
        key: "banner2",
      };
    } else {
      return {
        ...props.bannerLinks.banner3,
        key: "banner3",
      };
    }
  };

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (checkTypeImage(e.target.files)) {
        const imagesArray = Array.from(e.target.files) as File[];
        const bannerKey = returnData().key as keyof BannerLinks;
        props.setBannerLinks((prevState: BannerLinks) => ({
          ...prevState,
          [bannerKey]: {
            ...prevState[bannerKey],
            image: imagesArray,
            isEdit: true,
          },
        }));
      } else {
        toast.error("Only *.jpeg, *.jpg and *.png images will be accepted!", {
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600  mb-1">
        <InputEditTitle
          onSubmit={(e) => {
            const bannerKey = returnData().key as keyof BannerLinks;
            props.setBannerLinks((prevState: BannerLinks) => ({
              ...prevState,
              [bannerKey]: {
                ...prevState[bannerKey],
                isEdit: true,
                name: e,
              },
            }));
          }}
          value={returnData().name}
        />
      </label>
      <div className="sm:col-span-4">
        <div className="w-full text-center">
          <div
            className="border-2 border-gray-300  border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
            role="presentation"
          >
            <input
              accept="image/.jpeg,.jpg,.png"
              type="file"
              id={props.positionBanner.toString()}
              className="hidden"
              onChange={(e) => {
                handleInputImage(e);
              }}
            />
            <label
              htmlFor={props.positionBanner.toString()}
              className="cursor-pointer"
            >
              {returnData()?.image.length > 0 ? (
                <img
                  src={URL.createObjectURL(returnData()?.image[0])}
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
  );
};
