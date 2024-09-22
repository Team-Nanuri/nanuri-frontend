import {Link} from "react-router-dom";
import {ROUTER_PATH} from "@/global/const/const.ts";
import {Input} from "@/global/components/ui/input.tsx";
import {useState} from "react";
import {emailLogin} from "@/user/api/auth-api.ts";
import {useUser} from "@/user/hooks/useUser.ts";
import logo from "@/assets/logo.svg";
import rabbit from "@/assets/rabbit.svg";

export default function LoginPage() {
  const {login} = useUser();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    login({username, password});
  }

  return (
    <div className="w-full h-dvh flex flex-col p-[24px]">
      <div className="flex-[1]"/>

      <img className="w-full h-[60px]" src={logo}/>
      <div className="flex-[1]"/>
      <div className="font-normal text-[18px] mb-1">
        유저네임
      </div>
      <Input
        className="h-[60px] text-[18px]"
        placeholder={"유저네임 입력"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="h-[20px]"/>
      <div className="font-normal text-[18px] mb-1">
        비밀번호
      </div>
      <Input
        className="h-[60px] text-[18px]"
        type={"password"}
        placeholder={"비민번호 입력"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <div className="h-[45px]"/>
      <div className="flex flex-row justify-center">
        <div>
          회원이 아니신가요?
        </div>
        <Link className="pl-2 font-semibold" to={ROUTER_PATH.SIGNUP}>
          회원가입
        </Link>
      </div>
      <div className="flex-[3]"/>
      <GreenButton onClick={handleLogin}/>
    </div>
  );
}


export function GreenButton({onClick}: {onClick: () => void}) {
  return (
    <button
      className="h-[60px] bg-primaryGreen text-white rounded-[8px]"
      onClick={onClick}
    >
      로그인
    </button>
  );
}