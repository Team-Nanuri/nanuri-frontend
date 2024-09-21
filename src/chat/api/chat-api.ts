import {ChatSendRequest} from "@/chat/api/chat-request.ts";
import {axiosClient} from "@/global/api/axios.ts";
import {ArticleSimpleModel, ChatDetailResponse, ChatRoomModel, MessageModel} from "@/chat/api/chat-response.ts";
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
      userType: 'FOREIGNER',
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
  return {
    roomId: roomId,
    article: {
      articleId: 1,
      imageUrl: 'https://picsum.photos/200/300?random=1',
      title: 'Article 1',
      writer: {
        username: 'User 1',
        id: 1,
        userType: 'FOREIGNER',
      },
    },
    messages: [
      {
        message: 'Message 1',
        receiverId: 1,
        senderId: 3,
        createdAt: new Date().toISOString(),
      },
      {
        message: 'Message 2',
        receiverId: 1,
        senderId: 3,
        createdAt: new Date().toISOString(),
      },
      {
        message: 'Message 3',
        receiverId: 1,
        senderId: 3,
        createdAt: new Date().toISOString(),
      },
      {
        message: 'Message 4',
        receiverId: 3,
        senderId: 1,
        createdAt: new Date().toISOString(),
      },
      {
        message: 'Message 5',
        receiverId: 1,
        senderId: 3,
        createdAt: new Date().toISOString(),
      },
    ]
  }
}