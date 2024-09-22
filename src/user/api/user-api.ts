import {UserModel} from "@/user/api/user-response.ts";
import {axiosClient} from "@/global/api/axios.ts";

export async function getMyInfo(): Promise<UserModel>{
  const res = await axiosClient.get('/api/users/me')
  return res.data;
}

export async function getOtherUserInfo(userId: number): Promise<UserModel>{
  const res = await axiosClient.get(`/users/${userId}`);
  return res.data;
}