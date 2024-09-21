import {Input} from "@/global/components/ui/input.tsx";
import {Send} from "lucide-react";


interface ChatInputBoxProps {
  message: string;
  setMessage: (message: string) => void;
  onSendClicked: () => void;
}

export default function ChatInputBox({message, setMessage, onSendClicked}: ChatInputBoxProps) {
  return (
    <div className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white
    ">
      <Input
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSendClicked();
          }
        }}
      />
      <div className="w-[12px]"/>
      <button onClick={onSendClicked}>
        <Send/>
      </button>
    </div>
  );
}