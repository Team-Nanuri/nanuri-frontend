import profile from "@/assets/profile.svg";
import {ApiError} from "@/global/api/response.ts";
import {UserModel} from "@/user/api/user-response.ts";
import {useTranslation} from "react-i18next";

interface UserItemProps {
  user?: UserModel
  error: ApiError | null;
}

export default function UserItem({user, error}: UserItemProps) {
  const {  t } = useTranslation();
  return (
    <div className="h-[60px] items-center ml-[17px]">
      <div className="h-full flex">
        <img src={profile}/>
        {error && <p>Error loading user info</p>}
        {user ? (
          <div className="flex flex-col gap-[4px] ml-[10px] items-center">
            <label>{user.username} </label>
            <label>{t(user.userType)} </label>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}