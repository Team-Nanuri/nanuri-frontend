import {useUser} from "../hooks/useUser";
import styles from "./MyPage.module.css";

export default function MyPage() {
  const {user, error} = useUser();

  return (
    <div className="w-full h-">
      <div className={styles.header}>
        <img src={"/src/assets/profile.png"}/>
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
    </div>

  );
}

interface AdminButtonProps {
  label: string;
}


export function AdminButton({label}: AdminButtonProps) {
  return (
    <button className={styles.adminButton}>
      {label}
      <img src={"/src/assets/chevron-left.png"}/>
    </button>
  );
}

export function SettingButton({label}: AdminButtonProps) {
  return (
    <button className={styles.settingButton}>
      {label}
    </button>
  );
}