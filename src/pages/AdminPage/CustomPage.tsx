import { imageUrlToFile } from "@/utils/helper";
import { Carousel, Spinner } from "@material-tailwind/react";
import { Gear } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as bannerApi from "@/api/adminApi/bannerApi/bannerApi";
import useLoading from "@/hooks/useLoading";
import CustomBanner from "@/components/CustomPage/CustomBanner";

export interface BannerLinks {
  banner1: IBanner;
  banner2: IBanner;
  banner3: IBanner;
}

interface IBanner {
  name: string;
  image: File[];
  isEdit: boolean;
  status?: string;
  isUpdate?: boolean;
  id?: string;
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
    console.log(bannerLinks);
    startLoading();
    if (bannerLinks?.banner1?.isEdit && !bannerLinks?.banner1?.isUpdate) {
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
    if (bannerLinks?.banner1?.isEdit && bannerLinks?.banner1?.isUpdate) {
      let banner1 = new FormData();
      banner1.append("name", bannerLinks?.banner1?.name);
      bannerLinks?.banner1?.image.forEach((img) => {
        banner1.append("image", img);
      });
      banner1.append("status", bannerLinks?.banner1?.status as string);
      try {
        const data = await bannerApi.updateBanner(
          banner1,
          bannerLinks?.banner1?.id as string
        );
        if (data?.success) {
          stopLoading();
          toast.success("Update banner 1 success");
        }
      } catch (err: any) {
        stopLoading();
        toast.error(
          "Error when update banner 1: " + err?.response?.data?.message
        );
      }
    }
    if (bannerLinks?.banner2?.isEdit && !bannerLinks?.banner2?.isUpdate) {
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
    if (bannerLinks?.banner2?.isEdit && bannerLinks?.banner2?.isUpdate) {
      let banner2 = new FormData();
      banner2.append("name", bannerLinks?.banner2?.name);
      bannerLinks?.banner2?.image.forEach((img) => {
        banner2.append("image", img);
      });
      banner2.append("status", bannerLinks?.banner2?.status as string);
      try {
        const data = await bannerApi.updateBanner(
          banner2,
          bannerLinks?.banner2?.id as string
        );
        if (data?.success) {
          stopLoading();
          toast.success("Update banner 2 success");
        }
      } catch (err: any) {
        stopLoading();
        toast.error(
          "Error when update banner 2: " + err?.response?.data?.message
        );
      }
    }
    if (bannerLinks?.banner3?.isEdit && !bannerLinks?.banner3?.isUpdate) {
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
    if (bannerLinks?.banner3?.isEdit && bannerLinks?.banner3?.isUpdate) {
      let banner3 = new FormData();
      banner3.append("name", bannerLinks?.banner3?.name);
      bannerLinks?.banner3?.image.forEach((img) => {
        banner3.append("image", img);
      });
      banner3.append("status", bannerLinks?.banner3?.status as string);
      try {
        const data = await bannerApi.updateBanner(
          banner3,
          bannerLinks?.banner3?.id as string
        );
        if (data?.success) {
          stopLoading();
          toast.success("Update banner 3 success");
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

  const handleImageAdd = async (imageUrl: string, positionBanner: number) => {
    const file = await imageUrlToFile(imageUrl);
    if (file) {
      if (positionBanner === 1) {
        setBannerLinks((prevState: BannerLinks) => ({
          ...prevState,
          ["banner1"]: {
            ...prevState["banner1"],
            image: [file],
          },
        }));
      }
      if (positionBanner === 2) {
        setBannerLinks((prevState: BannerLinks) => ({
          ...prevState,
          ["banner2"]: {
            ...prevState["banner2"],
            image: [file],
          },
        }));
      }
      if (positionBanner === 3) {
        setBannerLinks((prevState: BannerLinks) => ({
          ...prevState,
          ["banner3"]: {
            ...prevState["banner3"],
            image: [file],
          },
        }));
      }
    } else {
      console.log("Failed to convert image URL to file");
    }
  };

  useEffect(() => {
    const getAllBanner = async () => {
      const data = await bannerApi.getAllBanner();
      if (data.success) {
        if (data?.data?.length > 0) {
          for (let index = 0; index < 3; index++) {
            setBannerLinks((prevState: BannerLinks) => ({
              ...prevState,
              [`banner${index + 1}`]: {
                ...prevState[`banner${index + 1}` as keyof BannerLinks],
                name: data?.data[index]?.name,
                status: data?.data[index]?.status,
                id: data?.data[index]?.id,
              },
            }));
            if (data?.data[index]?.imageUrl) {
              handleImageAdd(data?.data[index]?.imageUrl, index + 1);
            }
          }
        } else {
          for (let index = 0; index < 3; index++) {
            setBannerLinks((prevState: BannerLinks) => ({
              ...prevState,
              [`banner${index + 1}`]: {
                ...prevState[`banner${index + 1}` as keyof BannerLinks],
                name: `Banner${index + 1}`,
              },
            }));
          }
        }
      }
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
        <Carousel placeholder="" className="rounded-xl ">
          <img
            src={
              bannerLinks?.banner1?.image[0]
                ? URL.createObjectURL(bannerLinks?.banner1?.image[0])
                : "https://th.bing.com/th/id/R.1f3718bdbfff9827e03255ef0e947fe5?rik=gThi4aT0ZGgcEA&pid=ImgRaw&r=0&sres=1&sresct=1"
            }
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src={
              bannerLinks?.banner2?.image[0]
                ? URL.createObjectURL(bannerLinks?.banner2?.image[0])
                : "https://th.bing.com/th/id/R.1f3718bdbfff9827e03255ef0e947fe5?rik=gThi4aT0ZGgcEA&pid=ImgRaw&r=0&sres=1&sresct=1"
            }
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src={
              bannerLinks?.banner3?.image[0]
                ? URL.createObjectURL(bannerLinks?.banner3?.image[0])
                : "https://th.bing.com/th/id/R.1f3718bdbfff9827e03255ef0e947fe5?rik=gThi4aT0ZGgcEA&pid=ImgRaw&r=0&sres=1&sresct=1"
            }
            alt="image 3"
            className="h-full w-full object-cover"
          />
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
