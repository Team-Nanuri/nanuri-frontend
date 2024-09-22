export interface UserModel {
  id: number;
  username: string;
  userType: UserType;
}



export type UserType = 'FOREIGNER' | 'EXCHANGE_STUDENT';
