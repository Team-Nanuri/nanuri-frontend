import {Link} from "react-router-dom";
import {ROUTER_PATH} from "@/global/const/const.ts";
import {Input} from "@/global/components/ui/input.tsx";

export default function LoginPage() {
  return (
    <div className="w-full h-dvh flex flex-col p-[24px]">
      <div className="flex-[1]"/>
      <div className="font-normal text-[18px] mb-1">
        유저네임
      </div>
      <Input className="h-[60px] text-[18px]" placeholder={"유저네임 입력"}/>
      <div className="h-[20px]"/>
      <div className="font-normal text-[18px] mb-1">
        비밀번호
      </div>
      <Input className="h-[60px] text-[18px]" placeholder={"비민번호 입력"}/>
      <div className="h-[45px]"/>
      <div className="flex flex-row justify-center">
        <div>
          회원이 아니신가요?
        </div>
        <Link className="pl-2 font-semibold" to={ROUTER_PATH.SIGNUP}>
          회원가입
        </Link>
      </div>
      <div className="flex-[1]"/>
      <GreenButton/>
    </div>
  );
}


export function GreenButton() {
  return (
    <button className="h-[60px] bg-primaryGreen text-white rounded-[8px]">
      로그인
    </button>
  );
}