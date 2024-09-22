export interface UserModel {
  id: number;
  username: string;
  userType: UserType;
}



export type UserType = 'INTERNATIONAL' | 'EXCHANGE' | 'DUAL_DEGREE';
