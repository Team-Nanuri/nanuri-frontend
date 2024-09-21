import {Bell} from "lucide-react";
import {ChatRoomModel} from "@/chat/api/chat-response.ts";
import useChatRoomPaging from "@/chat/hooks/useChatRoomPaging.ts";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import LoadingSpinner from "@/global/components/LoadingSpinner.tsx";
import {ROUTER_PATH} from "@/global/const/const.ts";
import useNotice from "@/chat/hooks/useNotice.ts";
import {useTranslation} from "react-i18next";

export default function ChatPage() {
  const {
    data,
    ref,
    isFetchingNextPage,
  } = useChatRoomPaging();

  const {notices} = useNotice();


  return (
    <div className="w-full h-full">
      <ChatHeader count={notices?.length}/>
      <section className="h-[calc(100%-60px)] overflow-auto">
        {!data && <LoadingSpinner/>}
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {
              page.contents.map(chatRoom => (
                <RoomItem key={chatRoom.roomId} chatRoom={chatRoom}/>
              ))
            }
          </Fragment>
        ))}
        <div ref={ref}>
          {isFetchingNextPage && 'Loading more...'}
        </div>
      </section>
    </div>
  );
}


function ChatHeader({count}: { count?: number }) {
  const { t } = useTranslation();
  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white border-b
    ">
      <h1 className="font-normal text-[20px]">
        {t('채팅')}
      </h1>
      <Link to={ROUTER_PATH.NOTICE} className="relative">
        <Bell size={24}/>
        <span
          className="absolute top-[-5px] right-[-10px]
          bg-red-500 text-white text-xs font-bold rounded-full
           w-4 h-4 flex items-center justify-center"
        >
          {count}
        </span>
      </Link>
    </header>
  );
}

function RoomItem({chatRoom}: { chatRoom: ChatRoomModel }) {
  return (
    <Link className="
      h-[90px] w-full
      flex flex-row items-center justify-between
      border-b"
          to={`/chat/${chatRoom.roomId}`}
    >
      <img className="w-[60px] h-[60px] rounded-[6px] ml-[15px]" src={chatRoom.article.imageUrl} alt="#"/>
      <div className="pl-[12px] flex flex-col flex-grow justify-between h-full py-[16px] pr-[8px]">
        <div className="w-full flex flex-row items-center">
          <div className="font-semibold text-[16px]">
            {chatRoom.article.title}
          </div>
          <div className="w-[6px]"/>
          <div className="flex-[1] text-[12px]">
            {chatRoom.otherUser.username}
          </div>
          <div className="font-normal text-[14px]">
            {chatRoom.lastMessage.createdAt.substring(5, 10)}
          </div>
        </div>
        <div className="font-normal text-[14px]">
          {chatRoom.lastMessage.message}
        </div>
      </div>
    </Link>
  );
}