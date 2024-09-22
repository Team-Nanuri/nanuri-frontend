import {axiosClient} from "@/global/api/axios.ts";
import {SignupRequest} from "@/user/api/auth-request.ts";
import {LoginResponse} from "@/user/api/auth-response.ts";

export function signup(signupRequest: SignupRequest): Promise<void> {
  return axiosClient.post('/api/auth/signup', signupRequest);
}

export async function emailLogin(username: string, password: string): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append('email', username);
  formData.append('password', password);

  const res = await axiosClient.post('/api/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}
