import CreateCategory from "@/components/Category/createCategory";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import { Drawer } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as categoryApi from "@/api/adminApi/categoryApi/categoryApi";
import { toast } from "react-toastify";
import { ICategory } from "@/types/type";
import ButtonCloseDrawer from "@/components/ButtonCloseDrawer/ButtonCloseDrawer";
import FilterCategory from "@/components/Category/FilterCategory";
import OptionCategory from "@/components/Category/OptionCategory";

interface IResponseCategory {
  timestamp: string;
  success: boolean;
  message: string;
  data: ICategory[];
}

export default function Categorys() {
  const [open, setOpen] = useState<boolean>(false);
  const [openCreateCategory, setOpenCreateCategory] = useState<boolean>(false);
  const [categorys, setCategorys] = useState<IResponseCategory>();
  const [dataDelete, setDataDelete] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );

  // Open confirm delete
  const handleDelete = (e: string) => {
    setOpen(!open);
    setDataDelete(e);
  };
  const handleOpen = () => setOpen(!open);

  const handleDeleteCate = async () => {
    setOpen(!open);
    try {
      const data = await categoryApi.deleteCategory(dataDelete);
      if (data?.success) {
        toast.success(data?.message);
        getAllCategory();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Drawer
  const openDrawer = () => setOpenCreateCategory(true);
  const closeDrawer = () => setOpenCreateCategory(false);

  // handle add cate
  const handleAddCate = () => {
    setOpenCreateCategory(true);
    setCurrentCategory(null);
  };

  // Get all cate
  const getAllCategory = async () => {
    const data = await categoryApi.getAllCategory();
    setCategorys(data);
  };

  useEffect(() => {
    getAllCategory();
  }, [openCreateCategory]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">
          Categorys
        </h1>

        {/* Add and delete */}
        <OptionCategory handleAddCate={handleAddCate} />

        {/* Model create category */}
        <Drawer
          placeholder=""
          placement="right"
          open={openCreateCategory}
          onClose={closeDrawer}
          size={700}
        >
          <ButtonCloseDrawer closeDrawer={closeDrawer} />
          {openCreateCategory && (
            <CreateCategory
              type={currentCategory ? "edit" : "create"}
              categorys={categorys?.data}
              setOpenCreateCategory={setOpenCreateCategory}
              currentCategory={currentCategory}
            />
          )}
        </Drawer>

        {/* Filter */}
        <FilterCategory />

        {/* <TableCategorys /> */}
        <TableAdmin
          fieldTable={["id", "name", "image", "status", "actions"]}
          data=""
          isPaging={false}
          title="Category"
          scriptData={
            <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
              {categorys?.data?.map((cate, i) => (
                <tr key={i}>
                  <>
                    {/* <td className="px-4 py-2">
                  <input
                    id="644501ab7094a0000851284b"
                    name="Premium T-Shirt"
                    type="checkbox"
                  />
                </td> */}

                    <td className="px-4 py-2">
                      <span className="text-sm">{cate.id}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{cate.name}</span>
                    </td>
                    <td className="px-4 py-2">
                      <img
                        className="object-contain w-20 h-20 rounded-lg"
                        src={cate.imageUrl}
                        alt="product"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {cate.status === "HIDDEN" ? (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                          Hidden
                        </span>
                      ) : (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                          Publish
                        </span>
                      )}
                    </td>
                  </>

                  <td className="px-4 py-2">
                    <div className="flex justify-end text-right">
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                        onClick={() => {
                          setCurrentCategory(cate);
                          openDrawer();
                        }}
                      >
                        <p data-tip="true" data-for="edit" className="text-xl">
                          <Edit />
                        </p>
                      </button>
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                        onClick={() => handleDelete(cate.id)}
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
          open={open}
          handleOpen={handleOpen}
          title="Category"
          handleDelete={handleDeleteCate}
        />
      </div>
    </div>
  );
}
