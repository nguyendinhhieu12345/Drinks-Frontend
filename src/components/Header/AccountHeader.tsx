import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import assets from "@/assets";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import ImageWithError from "../ImageError/ImageWithError";

const AccountHeader = () => {
  const currentUser = useSelector<RootState, User>(
    (state) => state.authSlice.currentUser as User
  );

  return (
    <div>
      <div className="flex items-center justify-center px-3 py-2 gap-3 bg-white">
        <div className="account-info flex flex-col justify-center items-end">
          <h5 className="text-sm font-medium">
            {currentUser.full_name
              ? currentUser.full_name
              : "chưa cập nhật thông tin"}
          </h5>
          <p className="text-xs font-normal text-gray-600">
            {currentUser.username}
          </p>
        </div>
        <Menu>
          <MenuHandler>
            <div className="cursor-pointer">
              <ImageWithError
                src={
                  currentUser.avatar
                    ? currentUser.avatar instanceof FileList
                      ? URL.createObjectURL(currentUser.avatar[0])
                      : currentUser.avatar[0]
                    : assets.images.noAvatar
                }
                fallbackSrc={assets.images.noAvatar}
                alt="avatar"
                className="rounded-full h-[40px] w-[40px]"
              />
            </div>
          </MenuHandler>
          <MenuList placeholder="">
            <MenuItem placeholder="">DashBoard</MenuItem>
            <MenuItem placeholder="">Profile</MenuItem>
            <hr className="my-3" />
            <MenuItem placeholder="">Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default AccountHeader;
