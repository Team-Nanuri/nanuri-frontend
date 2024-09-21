import {MessageModel} from "@/chat/api/chat-response.ts";

export function shouldShowTime(messages : MessageModel[], index: number, message: MessageModel) {
  const date = new Date(message.createdAt);

  const isSingleMessage = messages.length === 1;
  const isFirstMessage = index === 0;
  const isLastMessage = index === messages.length - 1;
  const isNextTimeDifferent = isFirstMessage && messages.length > 1 && message.createdAt !== messages[1].createdAt;
  const isOtherDayAndNextTimeEqual = !isFirstMessage && !isLastMessage && new Date(messages[index-1].createdAt).getDay() !== date.getDay() && message.createdAt === messages[index + 1].createdAt;
  if(isOtherDayAndNextTimeEqual){
    return false;
  }
  const isPrevTimeDifferent = index > 0 && message.createdAt !== messages[index - 1].createdAt;

  return isSingleMessage || isNextTimeDifferent || isPrevTimeDifferent || isLastMessage;
}