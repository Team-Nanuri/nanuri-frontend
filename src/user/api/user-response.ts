export interface UserModel {
  id: number;
  username: string;
  userType: UserType;
}



type UserType = 'FOREIGNER' | 'EXCHANGE_STUDENT';
