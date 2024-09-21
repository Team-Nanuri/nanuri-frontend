import {ArticleStatus, ShareType} from "@/article/api/article-response.ts";

export interface ArticlePagingParams {
  page: number;
  size: number;
  writerId?: number;
  categories?: string;
  keyword?: string;
  shareType?: ShareType;
  status?: ArticleStatus;
  sort?: ArticleSort;
}

export type ArticleSort = "CREATED_AT_ASC" | "CREATED_AT_DESC";



export interface ArticleCreateRequest {
  category: ItemCategory;
  shareType: string;
  rentalStartDate: string;
  rentalEndDate: string;
  title: string;
  content: string;
  images: string[];
}


export interface ArticleUpdateRequest {
  category: ItemCategory;
  shareType: string;
  rentalStartDate: string;
  rentalEndDate: string;
  title: string;
  content: string;
  images: string[];
}

export interface ArticleStatusUpdateRequest {
  status: string;
}

export type ItemCategory = 
  | "ELECTRONIC_DEVICES"         // 전자기기
  | "HOME_APPLIANCES"            // 생활 가전
  | "FURNITURE_INTERIOR"         // 가구 & 인테리어
  | "BOOK_TICKET_ALBUM"          // 도서 & 티켓 & 음반
  | "SPORTS"                     // 스포츠
  | "MISCELLANEOUS_GOODS"        // 잡화
  | "WOMEN_CLOTHES"              // 여성 의류
  | "MEN_CLOTHES"                // 남성 의류
  | "GAME_HOBBY"                 // 게임 & 취미
  | "BEAUTY"                     // 뷰티
  | "ETC";                       // 기타

// 카테고리 매핑 객체
export const itemCategoryMap: Record<ItemCategory, string> = {
  "ELECTRONIC_DEVICES": "전자기기",
  "HOME_APPLIANCES": "생활 가전",
  "FURNITURE_INTERIOR": "가구 & 인테리어",
  "BOOK_TICKET_ALBUM": "도서 & 티켓 & 음반",
  "SPORTS": "스포츠",
  "MISCELLANEOUS_GOODS": "잡화",
  "WOMEN_CLOTHES": "여성 의류",
  "MEN_CLOTHES": "남성 의류",
  "GAME_HOBBY": "게임 & 취미",
  "BEAUTY": "뷰티",
  "ETC": "기타",
};

// 카테고리 사용 예시
export function getItemCategoryDescription(category: ItemCategory): string {
  return itemCategoryMap[category];
}
