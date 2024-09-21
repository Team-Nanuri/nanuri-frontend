import {ROUTER_PATH} from "@/global/const/const.ts";
import {Link} from "react-router-dom";
import {ChevronLeft} from "lucide-react";

export default function NoticePage() {
  return (
    <div className="w-full h-full">
      <NoticeHeader/>
      <section className="h-[calc(100%-60px)] overflow-auto">
        <div className="h-full flex justify-center items-center">
          <div>공지사항이 없습니다.</div>
        </div>
      </section>
    </div>
  );
}

function NoticeHeader() {
  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white border-b
    ">
      <Link to={ROUTER_PATH.CHAT}>
        <ChevronLeft/>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-normal text-[20px]">
          공지사항
        </h1>
      </div>
      <div className="w-[24px]"/>
    </header>
  );
}