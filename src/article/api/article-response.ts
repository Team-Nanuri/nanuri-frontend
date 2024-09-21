import {UserModel} from "@/user/api/user-response.ts";

export interface ArticleModel {
  articleId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  shareType: ShareType;
  status: ArticleStatus;
  liked: boolean;
}

export type ShareType = 'DONATE' | 'RENTAL';

export function shareTypeToKorean(shareType: ShareType): string {
  return shareType === 'DONATE' ? '나눔 중' : '대여 중';
}


export interface ArticleDetailModel {
  articleId: number;
  title: string;
  content: string;
  imageUrls: string[];
  category: string;
  shareType: ShareType;
  status: ArticleStatus;
  rentalStartDate: string;
  rentalEndDate: string;
  liked: boolean;
  writer: UserModel;
}

export type ArticleStatus = 'DONE' | 'ONGOING';
