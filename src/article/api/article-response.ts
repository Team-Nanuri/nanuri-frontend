import {UserModel} from "@/user/api/user-response.ts";

export interface ArticleModel {
  articleId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  shareType: ShareType;
  status: ArticleStatus;
  liked: boolean;
}

export type ShareType = 'DONATION' | 'RENTAL';


export interface ArticleDetailModel {
  articleId: number;
  title: string;
  content: string;
  imageUrls: string[];
  category: string;
  createdAt: string;
  shareType: ShareType;
  status: ArticleStatus;
  rentalStartDate: string;
  rentalEndDate: string;
  liked: boolean;
  writer: UserModel;
}

export type ArticleStatus = 'DONE' | 'ONGOING';

export default interface SuggestResponse {
  origin: string;
  translated: string;
}