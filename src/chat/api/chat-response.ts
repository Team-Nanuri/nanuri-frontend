import {UserModel} from "@/user/api/user-response.ts";


export interface ChatRoomModel {
  roomId: number;
  article: ArticleSimpleModel;
  lastMessage: MessageModel;
  otherUser: UserModel;
}

export interface ChatDetailResponse {
  roomId: number;
  article: ArticleSimpleModel;
  messages: MessageModel[];
  otherUser: UserModel;
}

export interface ArticleSimpleModel {
  articleId: number;
  title: string;
  imageUrl: string;
  writer: UserModel;
}

export interface MessageModel {
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
}


export interface NoticeModel {
  title: string;
  content: string;
}
