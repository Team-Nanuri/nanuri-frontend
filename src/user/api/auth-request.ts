import {UserType} from "@/user/api/user-response.ts";

export interface SignupRequest {
  username: string;
  password: string;
  userType: UserType;
  enrollmentProofImage: any;
}