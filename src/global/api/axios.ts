import axios from "axios";
import {API_BASE_URL} from "@/global/const/const.ts";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cross-Control-Allow-Origin': '*',
  },
});