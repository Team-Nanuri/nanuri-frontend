import {ChatSendRequest} from "@/chat/api/chat-request.ts";
import {axiosClient} from "@/global/api/axios.ts";
import {ChatDetailResponse, ChatRoomModel} from "@/chat/api/chat-response.ts";
import {PagingResponse} from "@/global/api/response.ts";
import {PagingParams} from "@/global/api/request.ts";

export function sendChatMessage(req: ChatSendRequest): Promise<void> {
  return axiosClient.post('/api/chat', req);
}

export async function getChatRoomPaging(params: PagingParams): Promise<PagingResponse<ChatRoomModel>> {
  const res = await axiosClient.get('/api/chat', {
    params: {
      ...params
    }
  });
  return res.data;
}

export async function getChatRoomDetail(roomId: number): Promise<ChatDetailResponse> {
  const res = await axiosClient.get(`/api/chat/${roomId}`);
  return res.data;
}