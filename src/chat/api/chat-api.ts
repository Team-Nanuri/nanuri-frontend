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

function genChatRoom(page: number, size: number): PagingResponse<ChatRoomModel> {
  const chatRooms: ChatRoomModel[] = [];
  for (let i = page * size; i < page * size + size; i++) {
    const otherUser: UserModel = {
      userType: 'EXCHANGE',
      id: i,
      username: `User ${i}`,
    }
    const lastMessage: MessageModel = {
      message: `Message ${i}`,
      createdAt: new Date().toISOString(),
      receiverId: i,
      senderId: i,
    }
    const article: ArticleSimpleModel = {
      articleId: i,
      title: `Article ${i}`,
      imageUrl: `https://picsum.photos/200/300?random=${i}`,
      writer: otherUser,
    }
    const chatRoom: ChatRoomModel = {
      roomId: i,
      article,
      lastMessage,
      otherUser,
    }
    chatRooms.push(chatRoom);
  }

  return {
    totalPages: 10,
    contents: chatRooms,
  }
}

export async function getChatRoomPaging(params: PagingParams): Promise<PagingResponse<ChatRoomModel>> {
  // const res = await axiosClient.get('/api/chat', {
  //   params: {
  //     ...params
  //   }
  // });
  // return res.data;

  const data = genChatRoom(params.page, params.size);
  console.log('paing api 콜!', params, data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return data;
}

export async function getChatRoomDetail(roomId: number): Promise<ChatDetailResponse> {
  // const res = await axiosClient.get(`/api/chat/${roomId}`);
  // return res.data;
  const messages = [...Array(30).fill(0).map((_, i) => {
    return {
      message: `Message ${i}`,
      receiverId: i % 3 === 0 ? 1 : 3,
      senderId: i % 3 === 0 ? 3 : 1,
      createdAt: i===0 ? '2024-03-11' : i===29 ? '2025-12-23' :  new Date().toISOString(),
    };
  })]; // 닫는 괄호 수정
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    roomId: roomId,
    article: {
      articleId: 1,
      imageUrl: 'https://picsum.photos/200/300?random=1',
      title: 'Article 1',
      writer: {
        username: 'User 1',
        id: 1,
        userType: 'INTERNATIONAL',
      },
    },
    messages,
    otherUser: {
      id: 3,
      username: 'User 3',
      userType: 'EXCHANGE',
    }
  }
}

export async function getNotices(): Promise<NoticeModel[]> {
  const res = await axiosClient.get('/api/notices');
  return res.data;
}