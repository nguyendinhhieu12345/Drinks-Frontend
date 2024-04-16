import assets from "@/assets";
import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import ImageWithError from "../ImageError/ImageWithError";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutThunk } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";

const AccountHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nav = useNavigate();

    const handleLogout = async () => {
        try {
            const data = await dispatch(logoutThunk());
            if (data?.type === "auth/logout/rejected") {
                toast.error((data as { error: { message: string } }).error?.message);
            } else {
                localStorage.setItem("role", "")
                nav(configRouter.login);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center px-3 py-2 gap-3 bg-white">
                <Menu>
                    <MenuHandler>
                        <div className="cursor-pointer">
                            <ImageWithError
                                src={assets.images.noAvatar}
                                fallbackSrc={assets.images.noAvatar}
                                alt="avatar"
                                className="rounded-full h-[40px] w-[40px]"
                            />
                        </div>
                    </MenuHandler>
                    <MenuList placeholder="">
                        <MenuItem placeholder="" onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default AccountHeader;
