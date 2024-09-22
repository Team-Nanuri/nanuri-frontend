import {axiosClient} from "@/global/api/axios.ts";
import {SignupRequest} from "@/user/api/auth-request.ts";
import {LoginResponse} from "@/user/api/auth-response.ts";

export function signup(signupRequest: SignupRequest): Promise<void> {
  const formData = new FormData();
  formData.append('username', signupRequest.username);
  formData.append('password', signupRequest.password);
  formData.append('userType', signupRequest.userType);
  formData.append('enrollmentProofImage', signupRequest.enrollmentProofImage);

  return axiosClient.post('/api/auth/signup', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function emailLogin(username: string, password: string): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const res = await axiosClient.post('/api/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}
