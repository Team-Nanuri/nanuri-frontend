import {useQuery} from "@tanstack/react-query";
import {getNotices} from "@/chat/api/chat-api.ts";
import {NoticeModel} from "@/chat/api/chat-response.ts";
import {ApiError} from "@/global/api/response.ts";

export default function useNotice() {
  const {data, error} = useQuery<NoticeModel[], ApiError, NoticeModel[]>({
    queryKey: ['notices'],
    queryFn: async () => {
      return await getNotices();
    },
    gcTime: 1000 * 60, // 1분 후 캐시 삭제
  });
  return {
    notices: data,
    error
  };

}