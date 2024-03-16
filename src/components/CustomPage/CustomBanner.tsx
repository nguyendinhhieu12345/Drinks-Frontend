import { FC } from "react";
// import InputEditTitle from "../InputWrap/InputEditTitle";
import { BannerLinks } from "@/pages/AdminPage/CustomPage";
import { checkTypeImage } from "@/utils/const";
import { toast } from "react-toastify";
import { ToggleSwitch } from "flowbite-react";

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
        if (returnData()?.id) {
          props.setBannerLinks((prevState: BannerLinks) => ({
            ...prevState,
            [bannerKey]: {
              ...prevState[bannerKey],
              isUpdate: true,
            },
          }));
        }
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
        {/* <InputEditTitle
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
            if (returnData()?.id) {
              props.setBannerLinks((prevState: BannerLinks) => ({
                ...prevState,
                [bannerKey]: {
                  ...prevState[bannerKey],
                  isUpdate: true,
                },
              }));
            }
          }}
          value={returnData().name}
        /> */}
        <h4>{returnData().name}</h4>
        {returnData()?.status && (
          <ToggleSwitch
            checked={returnData()?.status === "HIDDEN" ? false : true}
            label="Status"
            className="mt-2"
            onChange={(e) => {
              const bannerKey = returnData().key as keyof BannerLinks;
              props.setBannerLinks((prevState: BannerLinks) => ({
                ...prevState,
                [bannerKey]: {
                  ...prevState[bannerKey],
                  isEdit: true,
                  isUpdate: true,
                  status: e ? "VISIBLE" : "HIDDEN",
                },
              }));
            }}
          />
        )}
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

export default CustomBanner;
