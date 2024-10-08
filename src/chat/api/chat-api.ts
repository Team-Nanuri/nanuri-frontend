import {ChatRoomCreateRequest, ChatSendRequest} from "@/chat/api/chat-request.ts";
import {axiosClient} from "@/global/api/axios.ts";
import {
  ChatDetailResponse,
  ChatRoomModel,
  NoticeModel
} from "@/chat/api/chat-response.ts";
import {PagingResponse} from "@/global/api/response.ts";
import {PagingParams} from "@/global/api/request.ts";

export function sendChatMessage(req: ChatSendRequest): Promise<void> {
  return axiosClient.post('/api/chat/message', req);
}

export async function createChatRoom(req: ChatRoomCreateRequest): Promise<number> {
  const res = await axiosClient.post('/api/chat', req);
  return res.data
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

export async function getNotices(): Promise<NoticeModel[]> {
  const res = await axiosClient.get('/api/notices');
  return res.data;
}