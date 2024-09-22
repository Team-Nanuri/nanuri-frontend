import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ChatDetailResponse, MessageModel} from "@/chat/api/chat-response.ts";
import {ApiError} from "@/global/api/response.ts";
import {getChatRoomDetail, sendChatMessage} from "@/chat/api/chat-api.ts";
import {ChatSendRequest} from "@/chat/api/chat-request.ts";
import {UserModel} from "@/user/api/user-response.ts";
import {getMyInfo} from "@/user/api/user-api.ts";

interface UseMessageProps {
  roomId: number;
}

interface UseMessageResponse {
  data?: ChatDetailResponse;
  error: ApiError | null;
  sendMessage: (req: ChatSendRequest) => Promise<void>;
}

export default function useMessage({roomId}: UseMessageProps): UseMessageResponse {
  const {data, error} = useQuery<
    ChatDetailResponse,
    ApiError,
    ChatDetailResponse
  >({
    queryKey: ['chat', roomId],
    queryFn: async () => {
      return await getChatRoomDetail(roomId);
    },
    staleTime: 1000,
    refetchInterval: 1000, //1초마다 새로고침
    gcTime: 0,
  });
  const {data:user} = useQuery<UserModel, ApiError,UserModel>({
    queryKey: ['userInfo'],
    // enabled: localStorage.getItem(ACCESS_TOKEN) !== null, // 토큰이 없으면 쿼리를 실행x
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 60, // 1시간동안 캐시 유지
  });

  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation<
    void,// 성공 시 반환되는 데이터의 타입
    ApiError,
    ChatSendRequest, // mutationFn에 전달되는 데이터의 타입
    void // onMutate에서 반환되는 데이터의 타입
  >({
    mutationFn: async (req: ChatSendRequest) => {
      await sendChatMessage(req);
    },
    onSuccess: (data, req) => {
      queryClient.setQueryData<ChatDetailResponse>(['chat', roomId], (oldData) => {
        if (!oldData) return; // 데이터가 없을 경우 처리

        const optimisticMessage: MessageModel = {
          message: req.message,
          createdAt: new Date().toISOString(),
          senderId: user!.id,
          receiverId: oldData.otherUser.id,
        }
        return {
          ...oldData,
          messages: [
            ...oldData.messages,
            optimisticMessage,
          ],
        };
      });
    }
  });


  return {
    data,
    error,
    sendMessage: async (req) => {
      await sendMessageMutation.mutateAsync(req);
    }
  }
}