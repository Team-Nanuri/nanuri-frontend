import {Search} from "lucide-react";
import {ChatRoomModel} from "@/chat/api/chat-response.ts";
import useChatRoomPaging from "@/chat/hooks/useChatRoomPaging.ts";
import {Fragment} from "react";

export default function ChatPage() {
  const {
    data,
    ref,
    isFetchingNextPage,
  } = useChatRoomPaging();


  return (
    <div className="w-full h-full">
      <ChatHeader/>
      <section className="h-[calc(100%-60px)] overflow-auto">
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


function ChatHeader() {
  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white border-b
    ">
      <div>
        채팅
      </div>
      <Search/>
    </header>
  );
}

function RoomItem({chatRoom}: { chatRoom: ChatRoomModel }) {
  return (
    <div className="
      flex flex-row items-center justify-between
      px-[20px] py-[10px] border-b
    ">
      <div>
        {chatRoom.lastMessage.message}
      </div>
    </div>
  );
}