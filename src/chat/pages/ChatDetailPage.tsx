import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getChatRoomDetail} from "@/chat/api/chat-api.ts";
import {ArticleSimpleModel, MessageModel} from "@/chat/api/chat-response.ts";
import {ROUTER_PATH} from "@/global/const/const.ts";
import {ChevronLeft} from "lucide-react";
import {useState} from "react";
import ChatInputBox from "@/chat/components/ChatInputBox.tsx";

export default function ChatDetailPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [sendMessage, setSendMessage] = useState("");

  const {data, isError} = useQuery({
    queryKey: ['chat', roomId],
    queryFn: async () => {
      return await getChatRoomDetail(Number(roomId));
    },
    gcTime: 1000 * 60 * 5, // 5분
  });

  if(isError) {
    return <div>채팅방 정보를 불러오지 못했습니다.</div>;
  }
  if(!data) {
    return <div>로딩 중...</div>;
  }


  const onSendClicked = () => {
    if(sendMessage.trim() === "") {
      return;
    }
    alert(`메시지 전송: ${sendMessage}`);
  }

  return (
    <div className="w-full h-full">
      <ChatDetailHeader articleSimple={data.article}/>
      <section className="h-[calc(100%-120px)] overflow-auto">
        <ChatList messages={data.messages}/>
      </section>
      <ChatInputBox message={sendMessage} setMessage={setSendMessage} onSendClicked={onSendClicked}/>
    </div>
  );
}

function ChatDetailHeader({articleSimple}: { articleSimple: ArticleSimpleModel }) {
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
          {articleSimple.title}
        </h1>
        <div className="font-normal text-[12px]">
          {articleSimple.writer.username}
        </div>
      </div>
      <div className="w-[24px]"/>
    </header>
  );
}

function ChatList({messages}: { messages: MessageModel[] }) {
  return (
    <div className="w-full h-full">
      {messages.map((message,index) => (
        <ChatMessage key={index} message={message}/>
      ))}
    </div>
  );
}

interface ChatMessageProps {

}

function ChatMessage({message}: { message: MessageModel }) {
  return (
    <div>
      {message.message}
    </div>
  );
}
