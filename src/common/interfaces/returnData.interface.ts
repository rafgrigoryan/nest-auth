export interface IReturnData {
  data: object | null;
  message: string;
}

export interface ISignServiceReturnData {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
