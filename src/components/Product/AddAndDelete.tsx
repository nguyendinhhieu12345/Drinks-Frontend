import { Add } from "../SVG/Add.svg"
import AddProductFile from "./AddProductFile"

interface IAddAndDelete {
    getAllProduct: (key: string, page: number, productStatus: string, categoryId: string) => Promise<void>,
    handleRedirectAddProduct: () => void
}

function AddAndDelete({ getAllProduct, handleRedirectAddProduct }: IAddAndDelete) {
    return (
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
            <div className="p-4">
                <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center">
                    <AddProductFile getAllProduct={getAllProduct} />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <button
                                className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                                type="button"
                                onClick={handleRedirectAddProduct}
                            >
                                <span className="mr-2">
                                    <Add />
                                </span>
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAndDelete