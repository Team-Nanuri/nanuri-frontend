import {ROUTER_PATH} from "@/global/const/const.ts";
import {Link} from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import useNotice from "@/chat/hooks/useNotice.ts";
import {NoticeModel} from "@/chat/api/chat-response.ts";

export default function NoticePage() {
  const {notices, error} = useNotice();


  return (
    <div className="w-full h-full">
      <NoticeHeader/>
      <section className="h-[calc(100%-60px)] overflow-auto">
        {
          notices?.length === 0 && !error &&
            <div className="h-full flex justify-center items-center">
                <div>공지사항이 없습니다.</div>
            </div>
        }
        {
          notices?.map((notice,index) => (
            <NoticeItem notice={notice} key={index}/>
          ))
        }
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

function NoticeItem({ notice }: { notice: NoticeModel }) {
  return (
    <div className="p-2 bg-white border-b">
      <h3 className="text-[20px] font-semibold text-gray-800">
        {notice.title}
      </h3>
      <p className="text-gray-600 text-[12px] leading-relaxed">
        {notice.content}
      </p>
    </div>
  );
}