import { Spinner } from "@material-tailwind/react"
import { ArrowLeft } from "@phosphor-icons/react"

interface IHeaderAddProduct {
    handleRedirectProducts: () => void;
    handleAddProduct: () => Promise<void>;
    isLoading: boolean
}

function HeaderAddProduct({ isLoading, handleAddProduct, handleRedirectProducts }: IHeaderAddProduct) {
    return (
        <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
                <div
                    className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
                    onClick={handleRedirectProducts}
                >
                    <ArrowLeft />
                </div>
                <p className="text-lg font-semibold">
                    {location.pathname.split("/")[2].split("-")[0] === "add"
                        ? "Add"
                        : "Edit"}{" "}
                    Product
                </p>
            </div>
            <div>
                <button
                    className="px-4 py-2 bg-green-400 rounded-full text-white"
                    onClick={handleAddProduct}
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
    )
}

export default HeaderAddProduct