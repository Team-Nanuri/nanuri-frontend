export interface ArticleCreateRequest {
  category: string;
  shareType: string;
  rentalStartDate: string;
  rentalEndDate: string;
  title: string;
  content: string;
  images: string[];
}


export interface ArticleUpdateRequest {
  category: string;
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