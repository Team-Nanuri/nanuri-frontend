import {UserModel} from "@/user/api/user-response.ts";
import {useQuery} from "@tanstack/react-query";
import {ACCESS_TOKEN} from "@/global/const/const.ts";
import {getMyInfo} from "@/user/api/user-api.ts";
import {ApiError} from "@/global/api/response.ts";

interface UserState {
  user?: UserModel;
  error: ApiError | null
}

export function useUser(): UserState {
  const {data, error} = useQuery<UserModel, ApiError,UserModel>({
    queryKey: ['userInfo'],
    // enabled: localStorage.getItem(ACCESS_TOKEN) !== null, // 토큰이 없으면 쿼리를 실행x
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 60, // 1시간동안 캐시 유지
    gcTime: 1000 * 60 * 30, // 30분 후에 캐시 삭제
  });



  return {
    user: data,
    error: error
  }
}