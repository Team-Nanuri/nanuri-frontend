import {UserModel} from "@/user/api/user-response.ts";
import {axiosClient} from "@/global/api/axios.ts";

export async function getMyInfo(): Promise<UserModel>{
  // const res = await axiosClient.get('/api/users/me')
  // return res.data;
  return {
    id: 1,
    username: '테스트 유저',
    userType: 'FOREIGNER'
  }
}

export async function getOtherUserInfo(userId: number): Promise<UserModel>{
  const res = await axiosClient.get(`/user/${userId}`);
  return res.data;
}