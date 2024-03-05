
export default interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  verifiedEmail: boolean;
  isGuest: boolean;
  date: any;
  createdAt?: any;
  updatedAt?: any;
}
