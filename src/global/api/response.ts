export interface PagingResponse<T> {
  contents: T[];
  totalPages: number;
}

export class ApiError {
  constructor(public status: number, public message: string) {
  }
}