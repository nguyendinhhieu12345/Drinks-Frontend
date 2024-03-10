import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IBranch } from "@/types/type";
import * as branchApi from "@/api/adminApi/branchApi/branchApi";
import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";

interface IResponseBranch {
  timestamp: string;
  success: boolean;
  message: string;
  data: {
    branchList: IBranch[];
  };
}

export default function Branchs() {
  const [open, setOpen] = useState<boolean>(false);
  const [branchs, setBranchs] = useState<IResponseBranch>();
  const [dataDelete, setDataDelete] = useState<string>("");
  const nav = useNavigate();

  // Open confirm delete
  const handleDelete = (e: string) => {
    setOpen(!open);
    setDataDelete(e);
  };
  const handleOpen = () => setOpen(!open);

  const handleDeleteBranch = async () => {
    setOpen(!open);
    try {
      const data = await branchApi.deleteBranch(dataDelete);
      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        getAllBranch();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const getAllBranch = async () => {
    const data = await branchApi.getAllBranch(1);
    setBranchs(data);
  };

  useEffect(() => {
    getAllBranch();
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Branchs</h1>

        {/* Add and delete */}
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
          <div className="p-4">
            <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center xl:justify-end">
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
                    onClick={() => {
                      nav(configRouter.addBranchs);
                    }}
                  >
                    <span className="mr-2">
                      <Add />
                    </span>
                    Add Branch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <TableCategorys /> */}
        <TableAdmin
          fieldTable={[
            "id",
            "Name",
            "address",
            "phone",
            "Time",
            "Status",
            "actions",
          ]}
          data=""
          isPaging={false}
          title="Category"
          scriptData={
            <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
              {branchs?.data?.branchList?.map((branch, i) => (
                <tr key={i}>
                  <>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.id}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.name}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.fullAddress}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.phoneNumber}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.operatingTime}</span>
                    </td>
                    <td className="px-4 py-2">
                      {branch.status !== "ACTIVE" ? (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                          Hidden
                        </span>
                      ) : (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                          Active
                        </span>
                      )}
                    </td>
                  </>

                  <td className="px-4 py-2">
                    <div className="flex justify-end text-right">
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                        onClick={() => {
                          nav(
                            configRouter.editBranchs.slice(0, -3) + branch.id
                          );
                        }}
                      >
                        <p data-tip="true" data-for="edit" className="text-xl">
                          <Edit />
                        </p>
                      </button>
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                        onClick={() => handleDelete(branch.id)}
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
          title="Branch"
          handleDelete={handleDeleteBranch}
        />
      </div>
    </div>
  );
}
