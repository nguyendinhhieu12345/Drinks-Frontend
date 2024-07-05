import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import { Export } from "../SVG/Export.svg"

interface IMenuAddFile {
    handleOpen: (key: string) => void
}

function MenuAddFile({ handleOpen }: IMenuAddFile) {
    return (
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
    )
}

export default MenuAddFile