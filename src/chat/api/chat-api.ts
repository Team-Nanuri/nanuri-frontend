import {ChatSendRequest} from "@/chat/api/chat-request.ts";
import {axiosClient} from "@/global/api/axios.ts";
import {
  ArticleSimpleModel,
  ChatDetailResponse,
  ChatRoomModel,
  MessageModel,
  NoticeModel
} from "@/chat/api/chat-response.ts";
import {PagingResponse} from "@/global/api/response.ts";
import {PagingParams} from "@/global/api/request.ts";
import {UserModel} from "@/user/api/user-response.ts";

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

export async function getNotices(): Promise<NoticeModel[]> {
  const res = await axiosClient.get('/api/notices');
  return res.data;
}