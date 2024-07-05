// import { Export } from "@phosphor-icons/react";
import { Add } from "../SVG/Add.svg";
// import { Delete } from "../SVG/Delete.svg";  
// import { Import } from "../SVG/Import.svg";

interface IOptionCategory {
    handleAddCate: () => void;
}

function OptionCategory(props: IOptionCategory) {
    return (
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
            <div className="p-4 flex items-center justify-end ">
                <button
                    className="inline-flex max-w-44 items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                    type="button"
                    onClick={props?.handleAddCate}
                >
                    <span className="mr-2">
                        <Add />
                    </span>
                    Add Category
                </button>
            </div>
        </div>
    );
}

export default OptionCategory;
