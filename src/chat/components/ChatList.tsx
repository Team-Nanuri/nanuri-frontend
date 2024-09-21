import {MessageModel} from "@/chat/api/chat-response.ts";
import {useUser} from "@/user/hooks/useUser.ts";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {useEffect, useRef} from "react";
import {shouldShowTime} from "@/chat/utils/chat-utils.ts"; // 한국어 로케일 임포트


export function ChatList({messages}: { messages: MessageModel[] }) {
  const {user} = useUser();
  const dateStr = messages.length > 0 ? messages[0].createdAt : new Date().toDateString();
  const indexZeroDate = dayjs(dateStr).format('YYYY년 MM월 DD일');
  const chatEndRef = useRef<HTMLDivElement>(null); // 마지막 요소에 대한 참조

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    console.log('messages updated');
    scrollToBottom(); // 메시지가 업데이트될 때마다 스크롤을 아래로 이동
  }, [messages]);


  useEffect(() => {
    scrollToBottom(); // 처음 렌더링될 때 스크롤을 아래로 이동
  }, []);

  if (!user) {
    return (
      <div>로그인이 필요합니다.</div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="font-normal text-[12px] text-center my-[12px]">
        {indexZeroDate}
      </div>
      {messages.map((message, index) => (
        <div key={index}>
          {index !== 0 && (message.createdAt !== messages[index - 1].createdAt) && (
            <div className="font-normal text-[12px] text-center my-[12px]">
              {dayjs(message.createdAt).format('YYYY년 MM월 DD일')}
            </div>
          )}
          <ChatMessage
            key={index}
            message={message}
            isMine={message.senderId === user.id}
            showTime={shouldShowTime(messages, index, message)}
          />
        </div>
      ))}
      <div ref={chatEndRef} /> {/* 마지막 메시지 위치에 대한 참조 */}
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

  const dateStr = message.createdAt;
  dayjs.locale('ko'); // 한국어 로케일 설정

  const formatDateStr = dayjs(dateStr).format('A hh시 mm분');

  return (
    <div className={`flex ${alignment} items-end pb-[6px]`}> {/* 메시지 정렬을 flex로 조정 */}
      {isMine && showTime && (
        <div className="font-normal text-[12px] mb-[6px]">
          {formatDateStr}
        </div>
      )}
      <div className={`inline-block ${bgColor} mx-[8px] p-[8px] rounded-[12px] max-w-[80%]`}>
        <div className={`font-normal text-[14px] ${textColor}`}>
          {message.message}
        </div>
      </div>

      {!isMine && showTime && (
        <div className="font-normal text-[12px] mb-[6px]">
          {formatDateStr}
        </div>
      )}
    </div>
  );
}
