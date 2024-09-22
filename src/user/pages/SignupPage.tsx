import {Input} from "@/global/components/ui/input.tsx";
import {Checkbox} from "@/global/components/ui/checkbox.tsx";
import {Select} from "@/global/components/ui/select.tsx";
import {useState} from "react";
import {UserType} from "@/user/api/user-response.ts";
import {signup} from "@/user/api/auth-api.ts";
import {SignupRequest} from "@/user/api/auth-request.ts";
import {ArticleSort} from "@/article/api/article-request.ts";
import {useTranslation} from "react-i18next";
import {
  Drawer, DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/global/components/ui/drawer.tsx";

interface SignupReqDto {
  username: string;
  password: string;
  passwordConfirm: string;
  userType: UserType | undefined;
  enrollmentProofImage: File | undefined;
}

export default function SignupPage() {


  const [signupRequest, setSignupRequest] = useState<SignupReqDto>({
    username: "",
    password: "",
    passwordConfirm: "",
    userType: undefined,
    enrollmentProofImage: undefined
  });



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSignupRequest(prev => {
        return {
          ...prev,
          enrollmentProofImage: event.target.files[0]
        }
      });
    }
  };

  const handleSignup = () => {
    if(signupRequest.password !== signupRequest.passwordConfirm){
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const req:SignupRequest = {
      username: signupRequest.username,
      password: signupRequest.password,
      userType: signupRequest.userType!,
      enrollmentProofImage: signupRequest.enrollmentProofImage!
    }
    signup(req);
  }


  return (
    <div className="w-full h-full flex flex-col">

      <div className="flex items-center w-full h-[40px] font-bold text-[24px] p-[24px] bg-bgPrimaryWhite">
        회원가입
      </div>
      <div className="h-[calc(100%-40px)] w-full p-[24px]  overflow-auto">
        <div className="h-[40px]"/>
        <div className="font-normal text-[18px] mb-1">
          유저네임
        </div>
        <Input
          className="h-[60px] text-[18px]"
          placeholder={"유저네임 입력"}
          value={signupRequest.username}
          onChange={(e) => setSignupRequest(prev => {
            return {
              ...prev,
              username: e.target.value
            }
          })}
        />
        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          비밀번호
        </div>
        <Input
          className="h-[60px] text-[18px]"
          placeholder={"비민번호 입력"}
          type={"password"}
          value={signupRequest.password}
          onChange={(e) => setSignupRequest(prev=>{
            return {
              ...prev,
              password: e.target.value
            }
          })}
        />

        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          비밀번호 확인
        </div>
        <Input
          className="h-[60px] text-[18px]"
          placeholder={"비민번호 입력"}
          type={"password"}
          value={signupRequest.passwordConfirm}
          onChange={(e) => setSignupRequest(prev=>{
            return {
              ...prev,
              passwordConfirm: e.target.value
            }
            })}
        />

        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          학적유형
        </div>
        <DrawerUserType
          userType={signupRequest.userType}
          setUserType={(userType)=> setSignupRequest(prev=>{
            return {
              ...prev,
              userType
            }
          })}
        />

        <div className="h-[20px]"/>
        <div className="font-normal text-[18px] mb-1">
          재학 인증 파일 첨부
        </div>
        <div className="font-normal text-[14px] mb-1">
          Knuin(통합정보시스템) 학적 정보를 캡처해 업로드 해주세요.
          5MB 이하의 jpg, png 파일만 업로드할 수 있습니다.
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <Input id="picture" type="file" onChange={handleFileChange}/>
        </div>

        <div className="h-[45px]"/>

        <div className="w-full flex flex-row items-center justify-center">
          <Checkbox id="terms1"/>
          <div className="pl-[16px]">
            개인정보 처리방침에 동의합니다.
          </div>
        </div>

        <div className="h-[45px]"/>
        <GreenButton onClick={handleSignup}/>


      </div>


    </div>
  );
}

export function GreenButton({onClick}: {onClick: () => void}) {
  return (
    <button
      className="h-[60px] bg-primaryGreen text-white rounded-[8px] w-full"
      onClick={onClick}
    >
      회원가입
    </button>
  );
}



export function DrawerUserType(
  {userType, setUserType}: {
    userType: UserType | undefined,
    setUserType: (userType?: UserType) => void
  }
){
  const {  t } = useTranslation();

  let label = '학적유형';
  if(userType){
    label = userType;
  }


  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="h-[60px] w-full rounded-[6px] border-[1px] items-center justify-start flex pl-[10px]">
          <div className="text-[18px] text-[#666] ">
            {t(label)}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
          <DrawerTitle>{t("정렬")}</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <div className="flex flex-row justify-between gap-4">
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setUserType("EXCHANGE")}>
                  {t("EXCHANGE")}
                </button>
              </DrawerClose>
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setUserType("INTERNATIONAL")}
                >
                  {t("INTERNATIONAL")}
                </button>
              </DrawerClose>
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setUserType("DUAL_DEGREE")}
                >
                  {t("DUAL_DEGREE")}
                </button>
              </DrawerClose>
            </div>

            <DrawerClose asChild>
              <button
                className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                onClick={()=>setUserType(undefined)}
              >
                {t("취소")}
              </button>
            </DrawerClose>

          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

