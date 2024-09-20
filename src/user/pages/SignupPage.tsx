import {Input} from "@/global/components/ui/input.tsx";
import {Checkbox} from "@/global/components/ui/checkbox.tsx";
import {Select} from "@/global/components/ui/select.tsx";
export default function SignupPage() {
  return (
    <div className="w-full flex flex-col">

      <div className="flex items-center w-full h-[40px] font-bold text-[24px] fixed z-10 p-[24px] bg-bgPrimaryWhite">
        회원가입
      </div>
      <div className="h-[calc(100%-40px)]  w-full p-[24px]">
        <div className="h-[40px]"/>
        <div className="font-normal text-[18px] mb-1">
          유저네임
        </div>
        <Input className="h-[60px] text-[18px]" placeholder={"유저네임 입력"}/>
        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          비밀번호
        </div>
        <Input className="h-[60px] text-[18px]" placeholder={"비민번호 입력"}/>

        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          비밀번호 확인
        </div>
        <Input className="h-[60px] text-[18px]" placeholder={"비민번호 입력"}/>

        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          학적유형
        </div>
        <Input className="h-[60px] text-[18px]" placeholder={"선택"}/>

        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          재학 인증 파일 첨부
        </div>
        <div className="font-normal text-[14px] mb-1">
          Knuin(통합정보시스템) 학적 정보를 캡처해 업로드 해주세요.
          5MB 이하의 jpg, png 파일만 업로드할 수 있습니다.
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <Input id="picture" type="file"/>
        </div>

        <div className="h-[45px]"/>

        <div className="w-full flex flex-row items-center justify-center">
          <Checkbox id="terms1"/>
          <div className="pl-[16px]">
            개인정보 처리방침에 동의합니다.
          </div>
        </div>

        <div className="h-[45px]"/>
        <GreenButton/>


      </div>


    </div>
  );
}

export function GreenButton() {
  return (
    <button className="h-[60px] bg-primaryGreen text-white rounded-[8px] w-full">
      회원가입
    </button>
  );
}