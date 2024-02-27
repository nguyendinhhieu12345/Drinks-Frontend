import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { configRouter } from "@/configs/router";
import { ArrowLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as productApi from "@/api/adminApi/productApi/productApi";
import * as categoryApi from "@/api/adminApi/categoryApi/categoryApi";
import { ICategory } from "@/types/type";
import { toast } from "react-toastify";

interface IPriceProductSize {
  size: string;
  priceSize: number;
}
interface IPriceProductTopping {
  topping: string;
  priceTopping: number;
}

export default function AddProduct() {
  const [image, setImage] = useState<File[]>([]);
  const [size, setSize] = useState<string>("Small");
  const [pricingSize, setPricingSize] = useState<string>("");
  const [topping, setTopping] = useState<string>("");
  const [pricingTopping, setPricingTopping] = useState<string>("");
  const [listPriceSize, setListPriceSize] = useState<IPriceProductSize[]>([]);
  const [listPriceTopping, setListPriceTopping] = useState<
    IPriceProductTopping[]
  >([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const nav = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      const data = await categoryApi.getAllCategory();
      setCategory([...data?.data]);
    };
    getAllCategory();
  }, []);

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage([...e.target.files]);
    }
  };

  const handleRedirectProducts = () => {
    nav(configRouter.products);
  };

  const handleAddPriceProductSize = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (
        listPriceSize.filter((prev) => prev.size.trim() === size.trim())
          .length === 0
      ) {
        setListPriceSize((prev) => [
          ...prev,
          {
            size: size.trim(),
            priceSize: parseInt(pricingSize),
          },
        ]);
        setSize("Small");
        setPricingSize("");
      }
    }
  };

  const handleAddPriceProductTopping = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (
        listPriceTopping.filter(
          (prev) => prev.topping.trim() === topping.trim()
        ).length === 0
      ) {
        setListPriceTopping((prev) => [
          ...prev,
          {
            topping: topping.trim(),
            priceTopping: parseInt(pricingTopping),
          },
        ]);
        setTopping("");
        setPricingTopping("");
      }
    }
  };

  const handleAddProduct = async () => {
    let formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    listPriceSize.forEach((size, index) => {
      formData.append(
        `sizeList[${index}].size`,
        size.size.toString().toUpperCase()
      );
      formData.append(`sizeList[${index}].price`, size.priceSize.toString());
    });

    listPriceTopping.forEach((topping, index) => {
      formData.append(`toppingList[${index}].name`, topping.topping.toString());
      formData.append(
        `toppingList[${index}].price`,
        topping.priceTopping.toString()
      );
    });

    formData.append("name", name);

    formData.append("description", description);
    formData.append("categoryId", categoryId);
    image.forEach((img) => {
      formData.append("image", img);
    });
    const data = await productApi.addProduct(formData, "BEVERAGE");
    if (data?.success) {
      toast.success(data?.message);
      nav(configRouter.products);
    } else {
      toast.success(data?.message);
    }
  };

  return (
    <div className="w-full h-auto min-h-full overflow-auto py-3 px-8 ">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
            onClick={handleRedirectProducts}
          >
            <ArrowLeft />
          </div>
          <p className="text-lg font-semibold">Add Product</p>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-green-400 rounded-full text-white"
            onClick={handleAddProduct}
          >
            Save
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex">
        <div className="w-[70%] flex flex-col">
          {/* Enter information product */}
          <div className="w-full h-auto bg-white rounded-xl p-3">
            <div className="mb-3">
              <p className="mb-3 font-normal text-sm">Title</p>
              <input
                className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                type="text"
                placeholder="Product name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <p className="mb-3 font-normal text-sm">Description</p>
              <textarea
                className="block w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2 min-h-20 h-40 max-h-60"
                placeholder="Desciption"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="">
              <p className="mb-3 font-normal text-sm">Category</p>
              <select
                className="w-full rounded-xl text-base"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {category?.map((cate, index) => (
                  <option key={index} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Enter image product */}
          <div className="mt-6 w-full h-auto bg-white rounded-xl p-3">
            <label className="block mb-3 w-full text-gray-800 font-medium text-sm">
              Thumnail Product
            </label>
            <div className="w-full">
              <div className="w-full text-center">
                <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
                  <input
                    accept="image/*,.jpeg,.jpg,.png,.webp"
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={(e) => {
                      handleInputImage(e);
                    }}
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    {image.length > 0 ? (
                      <img
                        src={URL.createObjectURL(image[0])}
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
                          (Only *.jpeg, *.webp and *.png images will be
                          accepted)
                        </em>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Enter topping */}
          <div className="mt-6 w-full h-auto bg-white rounded-xl p-3">
            <label className="block mb-3 w-full text-gray-800 font-medium text-sm">
              Pricing
            </label>
            <div className="flex items-center justify-around">
              <div className="mb-3 w-[48%]">
                <p className="mb-3 font-normal text-sm">Size</p>
                <select
                  className="w-full rounded-xl text-base"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  value={size}
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
              <div className="mb-3 w-[48%]">
                <p className="mb-3 font-normal text-sm">
                  Price <span className="text-xs">(đ)</span>
                </p>
                <input
                  className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="number"
                  placeholder="Product price"
                  id="priceSize"
                  name="priceSize"
                  value={pricingSize}
                  onChange={(e) => {
                    setPricingSize(e.target.value);
                  }}
                  onKeyDown={handleAddPriceProductSize}
                />
              </div>
            </div>
            <div className="flex items-center justify-around">
              <div className="mb-3 w-[48%]">
                <p className="mb-3 font-normal text-sm">Topping</p>
                <input
                  className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="text"
                  placeholder="Topping"
                  id="topping"
                  name="topping"
                  value={topping}
                  onChange={(e) => {
                    setTopping(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3 w-[48%]">
                <p className="mb-3 font-normal text-sm">
                  Price <span className="text-xs">(đ)</span>
                </p>
                <input
                  className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                  type="number"
                  placeholder="Product price"
                  id="priceTopping"
                  name="priceTopping"
                  value={pricingTopping}
                  onChange={(e) => {
                    setPricingTopping(e.target.value);
                  }}
                  onKeyDown={handleAddPriceProductTopping}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex flex-col ml-4">
          {/* Set status */}
          <div className="w-full h-auto bg-white rounded-xl p-3">
            <p className="mb-3 font-normal text-sm">Status</p>
            <select className="w-full rounded-xl text-base">
              <option>Active</option>
              <option>Unactive</option>
            </select>
          </div>

          {/* Overview */}
          <div className="w-full h-auto bg-white rounded-xl p-3 mt-3">
            <p className="mb-3 font-normal text-sm">Overview Pricing</p>
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                  <tr>
                    <td className="px-4 py-2">Type</td>
                    <td className="px-4 py-2">Price</td>
                    <td className="px-4 py-2 text-right">ACTIONS</td>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
                  {/* display size */}
                  {listPriceSize.map((size, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2">
                        <span className="text-sm">{size.size}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm font-semibold">
                          {size.priceSize}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex justify-end text-right">
                          <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                            <p
                              data-tip="true"
                              data-for="edit"
                              className="text-xl"
                            >
                              <Edit />
                            </p>
                          </button>
                          <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

                  {/* display topping */}
                  {listPriceTopping.map((topping, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2">
                        <span className="text-sm">{topping.topping}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm font-semibold">
                          {topping.priceTopping}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex justify-end text-right">
                          <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                            <p
                              data-tip="true"
                              data-for="edit"
                              className="text-xl"
                            >
                              <Edit />
                            </p>
                          </button>
                          <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
