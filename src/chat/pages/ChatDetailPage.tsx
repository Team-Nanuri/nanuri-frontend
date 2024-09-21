import {Link, useParams} from "react-router-dom";
import {ArticleSimpleModel} from "@/chat/api/chat-response.ts";
import {ROUTER_PATH} from "@/global/const/const.ts";
import {ChevronLeft} from "lucide-react";
import {useState} from "react";
import ChatInputBox from "@/chat/components/ChatInputBox.tsx";
import {ChatList} from "@/chat/components/ChatList.tsx";
import useMessage from "@/chat/hooks/useMessage.ts";
import {ChatSendRequest} from "@/chat/api/chat-request.ts";

export default function ChatDetailPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [toSendMessage, setToSendMessage] = useState("");

  const {data, error, sendMessage} = useMessage({
    roomId: Number(roomId),
  });

  if(error) {
    return <div>채팅방 정보를 불러오지 못했습니다.</div>;
  }
  if(!data) {
    return <div>로딩 중...</div>;
  }


  const onSendClicked = () => {
    if(toSendMessage.trim() === "") {
      return;
    }
    const req: ChatSendRequest = {
      message: toSendMessage,
      articleId: data.article.articleId,
      receiverId: data.otherUser.id
    }
    setToSendMessage("");
    sendMessage(req);
  }

  return (
    <div className="w-full h-full">
      <ChatDetailHeader articleSimple={data.article}/>
      <section className="h-[calc(100%-120px)] overflow-auto">
        <ChatList messages={data.messages}/>
      </section>
      <ChatInputBox message={toSendMessage} setMessage={setToSendMessage} onSendClicked={onSendClicked}/>
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
