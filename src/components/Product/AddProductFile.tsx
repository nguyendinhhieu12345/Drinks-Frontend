import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    Spinner,
} from "@material-tailwind/react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Export } from "@/components/SVG/Export.svg";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import useLoading from "@/hooks/useLoading";
import { toast } from "react-toastify";
import * as productApi from "@/api/adminApi/productApi/productApi"

function AddProductFile() {
    const [type, setType] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<any[]>([]);
    const [file, setFile] = useState<File[]>([]);
    const { isLoading, startLoading, stopLoading } = useLoading()

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile([...e.target.files])
            const reader = new FileReader();
            reader.readAsBinaryString(e.target.files[0]);
            reader.onload = (event: ProgressEvent<FileReader>): void => {
                if (event.target && event.target.result) {
                    const data: string | ArrayBuffer = event.target.result;
                    const workbook = XLSX.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const parsedData = XLSX.utils.sheet_to_json(sheet);
                    setData(parsedData);
                }
            };
        }
    }

    const handleOpen = (type?: string) => {
        setFile([])
        setData([])
        if (type) {
            setType(type)
        }
        setOpen(prev => !prev)
    }

    const handleAddFile = async () => {
        try {
            startLoading()
            const formData = new FormData();
            file.map(file => formData.append("file", file))
            const data = await productApi.addFileProduct(formData, type)
            if (data?.success) {
                stopLoading();
                toast.success(data?.message)
                setFile([])
                setData([])
            }
        } catch (err: any) {
            stopLoading();
            toast.error(err?.response?.data?.message);
        }
    }

    return (
        <div className="flex-grow-0 sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow">
            <div className=" lg:flex md:flex flex-grow-0">
                <div className="flex">
                    <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
                        <Menu>
                            <MenuHandler>
                                <button className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                                    <Export />
                                    <span className="text-xs">Import</span>
                                </button>
                            </MenuHandler>
                            <MenuList placeholder="">
                                <MenuItem placeholder="" className="flex item-center font-semibold text-black opacity-90" onClick={() => handleOpen("BEVERAGE")}><Export />Beverage</MenuItem>
                                <MenuItem placeholder="" className="flex item-center font-semibold text-black opacity-90" onClick={() => handleOpen("CAKE")}><Export />Cake</MenuItem>
                            </MenuList>
                        </Menu>
                        <Dialog size="xl" placeholder="" open={open} handler={handleOpen}>
                            <DialogHeader placeholder="">Add Product</DialogHeader>
                            <DialogBody placeholder="">
                                <div className="w-full text-center">
                                    <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
                                        <input
                                            accept=".xlsx, .xls"
                                            type="file"
                                            id="file"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                        <label htmlFor="file" className="cursor-pointer">
                                            {data.length > 0 ? (
                                                <Card placeholder="" className="h-full w-full overflow-scroll">
                                                    <table className="w-full min-w-max table-auto text-left">
                                                        <thead>
                                                            <tr>
                                                                {Object.keys(data[0]).map((key, index) => {
                                                                    if (index < Object.keys(data[0]).length - 1) {
                                                                        return (
                                                                            <th key={key} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">{key}</th>
                                                                        )
                                                                    }
                                                                })}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.map((row, index) => (
                                                                <tr key={index}>
                                                                    {Object.values(row).map((value: any, index) => {
                                                                        if (index < Object.keys(data[0]).length - 1)
                                                                            return (
                                                                                <td key={index}>
                                                                                    {index === Object.keys(data[0])?.findIndex(data => (data === "Image" || data === "image")) ?
                                                                                        <><img src={value} alt="img product" className="w-10 h-10 object-contain" /></>
                                                                                        :
                                                                                        <>{value}</>
                                                                                    }
                                                                                </td>
                                                                            )
                                                                    })}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </Card>
                                            )
                                                :
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
                                                    <p className="text-sm mt-2">Choose your file excel here</p>
                                                    <em className="text-xs text-gray-400">
                                                        (Only *.xlsx, *.xls images will be accepted)
                                                    </em>
                                                </>
                                            }
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
                                    onClick={() => handleOpen()}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button placeholder="" variant="gradient" color="green"
                                    onClick={handleAddFile}
                                >
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
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddProductFile