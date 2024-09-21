import {MessageModel} from "@/chat/api/chat-response.ts";
import {useUser} from "@/user/hooks/useUser.ts";

export function ChatList({messages}: { messages: MessageModel[] }) {
  const {user} = useUser();
  if (!user) {
    return (
      <div>로그인이 필요합니다.</div>
    );
  }

  return (
    <div className="w-full h-full">
      {messages.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <div>메시지가 없습니다.</div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="font-normal text-[12px] text-center mb-[12px]">
          {messages[0].createdAt}
        </div>
      )}

      {messages.map((message, index) => (
        <>
          {index !== 0 && (message.createdAt !== messages[index - 1].createdAt) && (
            <div className="font-normal text-[12px] text-center mb-[12px]">
              {message.createdAt}
            </div>
          )}
          <ChatMessage
            key={index}
            message={message}
            isMine={message.senderId === user.id}
            showTime={true}
          />
        </>
      ))}
    </div>
  );
}

interface ChatMessageProps {
  message: MessageModel;
  isMine: boolean;
  showTime?: boolean;
}

function ChatMessage({message, isMine, showTime}: ChatMessageProps) {
  const bgColor = isMine ? 'bg-chatGreen' : 'bg-chatGrey';
  const textColor = isMine ? 'text-chatWhiteForGreen' : 'text-black';
  const alignment = isMine ? 'justify-end' : 'justify-start'; // 메시지 정렬


  return (
    <div className={`flex ${alignment} items-end pb-[6px]`}> {/* 메시지 정렬을 flex로 조정 */}
      {isMine && showTime && (
        <div className="font-normal text-[12px] mb-[6px]">
          {message.createdAt}
        </div>
      )}
      <div className={`inline-block ${bgColor} m-[6px] p-[8px] rounded-[12px] max-w-[80%]`}>
        <div className={`font-normal text-[14px] ${textColor}`}>
          {message.message}
        </div>
      </div>

      {!isMine && showTime && (
        <div className="font-normal text-[12px] mb-[6px]">
          {message.createdAt}
        </div>
      )}
    </div>
  );
}
