import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL, REFRESH_TOKEN} from "@/global/const/const.ts";
import {ApiError} from "@/global/api/response.ts";
import {useQueryClient} from "@tanstack/react-query";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cross-Control-Allow-Origin': '*',
  },
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


axiosClient.interceptors.response.use(
  (response) => {
    return {
      ...response,
    }
  },
  async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 500) && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const resp = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Cross-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      if (resp.ok) {
        console.log('토큰 재발급 성공');
        const res = await resp.json();
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        return axiosClient(originalRequest);
      }else{
        console.log('토큰 재발급 실패');
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);

        const queryClient = useQueryClient();
        queryClient.removeQueries({
          queryKey: ['userInfo'],
        });
      }
      return Promise.reject(error);
    }
    // 응답 body에서 받은 에러코드와 메시지로 에러 객체 생성 후 throw
    const resBody = error.response.data;
    if(resBody.result === 'FAIL') {
      throw new ApiError(error.response.status,resBody.message);

    }
    return Promise.reject(error);
  },
);