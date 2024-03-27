import { Export } from "@/components/SVG/Export.svg"
import { Menu, MenuHandler, MenuItem, MenuList, Spinner } from "@material-tailwind/react"
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { checkTypeImage } from "@/utils/const";
import { toast } from "react-toastify";
import * as albumApi from "@/api/adminApi/albumApi/albumApi"
import useLoading from "@/hooks/useLoading";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import { ClipboardText } from "@phosphor-icons/react";
import { Delete } from "@/components/SVG/Delete.svg";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import { useCopyToClipboard } from "usehooks-ts";

interface IResponseAlbum {
  timestamp: string;
  success: boolean;
  message: string;
  data: {
    totalPage: number;
    imageList: {
      id: string;
      imageUrl: string;
    }[]
  }
}

function Album() {
  const [open, setOpen] = useState<{
    isOpenProduct: boolean,
    isOpencategory: boolean,
    isOpen: boolean,
    isDelete?: boolean,
    albumDelete?: string;
  }>({
    isOpenProduct: false,
    isOpencategory: false,
    isOpen: false,
    isDelete: false,
    albumDelete: ""
  });
  const [image, setImage] = useState<File[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [albums, setAlbums] = useState<IResponseAlbum>()
  const [filters, setFilters] = useState<{
    album_type: string;
    sort_type: string;
  }>({
    album_type: "All",
    sort_type: "CREATED_AT_DESC"
  })
  const [value, copy] = useCopyToClipboard();

  const getAllAlbum = async (album_type: string, sort_type: string, currentPage: number) => {
    const data = await albumApi.getAllAlbum(album_type, currentPage, sort_type)
    setAlbums(data)
  }

  useEffect(() => {
    getAllAlbum("", "", 1)
  }, [])

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (checkTypeImage(e.target.files)) {
        setImage([...e.target.files]);
      } else {
        toast.error("Only *.jpeg, *.jpg and *.png images will be accepted!", {
          position: "bottom-left",
        });
      }
    }
  };

  const handleOpen = (key: string) => {
    if (key === "product") {
      setOpen({
        isOpencategory: false,
        isOpenProduct: true,
        isOpen: true
      })
    }
    else {
      setOpen({
        isOpencategory: true,
        isOpenProduct: false,
        isOpen: true
      })
    }
  }

  const handleOpenDelete = () => {
    setOpen({
      isOpencategory: false,
      isOpenProduct: false,
      isOpen: false,
      isDelete: false
    })
  }

  const handleFilter = () => {
    getAllAlbum(filters?.album_type !== "All" ? filters?.album_type : "", filters.sort_type, 1)
  }

  const handleResetFilter = () => {
    getAllAlbum("", "", 1)
    setFilters({
      album_type: "All",
      sort_type: "CREATED_AT_DESC"
    })
  }

  const handleClose = async (isAdd: boolean) => {
    if (isAdd) {
      if (image.length > 0) {
        startLoading()
        let newAlbum = new FormData()
        if (open?.isOpenProduct) {
          newAlbum.append("type", "PRODUCT")
        }
        else {
          newAlbum.append("type", "CATEGORY")
        }
        image.forEach((img) => {
          newAlbum.append("image", img);
        });
        try {
          const data = await albumApi.addAlbum(newAlbum)
          if (data?.success) {
            getAllAlbum("", "", 1)
            toast.success(data?.success)
            stopLoading()
          }
        }
        catch (err: any) {
          stopLoading()
          toast.error(err?.response?.data?.message)
        }
      }
      else {
        stopLoading()
        toast.error("Please enter image!")
      }
    }
    setOpen({
      isOpencategory: false,
      isOpenProduct: false,
      isOpen: false
    })
  }

  const handleDelete = async () => {
    try {
      startLoading()
      const data = await albumApi.deleteAlbum(open?.albumDelete as string)
      if (data?.success) {
        stopLoading()
        getAllAlbum("", "", 1)
        setOpen({
          isOpenProduct: false,
          isOpencategory: false,
          isOpen: false,
          isDelete: false,
          albumDelete: ""
        })
        toast.success(data?.success)
      }
    }
    catch (err: any) {
      stopLoading()
      toast.error(err?.response?.data?.message)
    }
  }

  const handleCopy = (albumURL: string) => {
    copy(albumURL)
    toast.success(`Copy ${value ? value : "value"} success`)
  }

  return (
    <div className="mx-5">
      {/* add image */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">Files</p>
        <Menu>
          <MenuHandler>
            <button className="bg-black text-white px-4 py-2 rounded-lg">Upload File</button>
          </MenuHandler>
          <MenuList placeholder="">
            <MenuItem placeholder="" className="flex item-center font-semibold text-black opacity-90" onClick={() => handleOpen("product")}><Export />Product</MenuItem>
            <MenuItem placeholder="" className="flex item-center font-semibold text-black opacity-90" onClick={() => handleOpen("category")}><Export />Category</MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className="min-w-0 my-5 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0">
        <div className="py-2 px-4">
          <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <select
                onChange={(e) => setFilters((prev: any) => ({
                  ...prev,
                  album_type: e.target.value.toUpperCase()
                }))}
                className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:shadow-none leading-5"
              >
                <option value="All">
                  All
                </option>
                <option value="Product">
                  Product
                </option>
                <option value="Category">
                  Category
                </option>
              </select>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <select
                onChange={(e) => setFilters((prev: any) => ({
                  ...prev,
                  sort_type: e.target.value.toUpperCase()
                }))}
                className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:shadow-none leading-5"
              >
                <option value="CREATED_AT_ASC">
                  Created ASC
                </option>
                <option value="CREATED_AT_DESC">
                  Created DESC
                </option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <div className="w-full mx-1">
                <button
                  className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 h-12 w-full"
                  type="submit"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
              <div className="w-full mx-1">
                <button
                  className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                  type="reset"
                  onClick={handleResetFilter}
                >
                  <span className="text-black ">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* dialog enter image */}
      <Dialog placeholder="" open={open?.isOpen} handler={handleClose}>
        <DialogHeader placeholder="">{open?.isOpenProduct ? "Add Product" : "Add Category"}</DialogHeader>
        <DialogBody placeholder="">
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
                {
                  image.length > 0 ? (
                    <img
                      src={URL.createObjectURL(image[0])}
                      alt="image-category"
                      className="w-full h-60 object-contain"
                    />
                  )
                    : (
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
            <div className="text-emerald-500"></div>
            <aside className="flex flex-row flex-wrap mt-4"></aside>
          </div>
        </DialogBody>
        <DialogFooter placeholder="">
          <Button
            placeholder=""
            variant="text"
            color="red"
            onClick={() => handleClose(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button placeholder="" variant="gradient" color="green" onClick={() => handleClose(true)}>
            {isLoading ? (
              <p className="flex items-center justify-center">
                <span className="mr-2">
                  Confirm
                </span>{" "}
                <Spinner className="h-4 w-4" />
              </p>
            ) : (
              <span>Confirm</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* table display list image */}
      <div className="my-5"></div>
      <TableAdmin
        fieldTable={["id", "Image", "actions"]}
        data={albums}
        isPaging={true}
        title="Product"
        getAllAlbum={getAllAlbum}
        scriptData={
          <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
            {albums?.data?.imageList?.map((album, i) => (
              <tr key={i}>
                <td className="px-4 py-2">
                  <span className="text-sm">{album.id}</span>
                </td>
                <td className="px-4 py-2">
                  <img
                    className="object-contain w-30 h-30 rounded-lg"
                    src={album.imageUrl}
                    alt="product"
                    loading="lazy"
                  />
                </td>

                <td className="px-4 py-2">
                  <div className="flex justify-end text-right">
                    <button
                      className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                      onClick={() => handleCopy(album.imageUrl)}
                    >
                      <p data-tip="true" data-for="edit" className="text-xl">
                        <ClipboardText size={25} />
                      </p>
                    </button>
                    <button
                      onClick={() => setOpen((prev: any) => ({
                        ...prev,
                        isDelete: true,
                        albumDelete: album.id
                      }))}
                      className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                    >
                      <p
                        data-tip="true"
                        data-for="delete"
                        className="text-xl"
                      >
                        <Delete />
                      </p>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        }
      />
      <TableConfirmDelete
        open={open?.isDelete as boolean}
        handleOpen={handleOpenDelete}
        title="Image"
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Album