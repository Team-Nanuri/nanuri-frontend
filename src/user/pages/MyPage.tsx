import { useUser } from "../hooks/useUser";
import styles from "./MyPage.module.css";
import profile from "@/assets/profile.svg";
import {Link} from "react-router-dom";
import {ROUTER_PATH} from "@/global/const/const.ts";
import {ChevronRight} from "lucide-react";
import {useTranslation} from "react-i18next";

export default function MyPage() {

  const { i18n } = useTranslation();
  const { user, error } = useUser();

  return (
    <div className="w-full h-full">
      <div className={styles.header}>
        <div className={styles.header_content}>
          <Link to={ROUTER_PATH.MY_ARTICLE}>
            <img src={profile}/>
          </Link>
          {error && <p>Error loading user info</p>}
          {user ? (
            <div className={styles.user}>
              <label>{user.username} </label>
              <label>{user.userType} </label>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      </div>

      <hr className={styles.line}></hr>
      <div className={styles.admin}>
        <AdminButton label="나눔 물품 관리"/>
        <AdminButton label="회원 정보 관리"/>
      </div>

      <hr className={styles.line}></hr>
      <div className={styles.setting}>
        <SettingButton label="로그아웃"/>
        <SettingButton label="탈퇴하기"/>
        <SettingButton label="개인정보처리방침"/>
      </div>

      <div className="flex flex-row gap-[12px] px-[8px]">
        <button onClick={() => i18n.changeLanguage('ko')}>korean</button>
        <button onClick={() => i18n.changeLanguage('en')}>english</button>

      </div>
    </div>
  );
}

interface AdminButtonProps {
  label: string;
}

export function AdminButton({label}: AdminButtonProps) {
  return (
    <button className={styles.adminButton}>
      <div>
        {label}
      </div>
      <ChevronRight/>
    </button>
  );
}

export function SettingButton({ label }: AdminButtonProps) {
  return <button className={styles.settingButton}>{label}</button>;
}
