import { RoleTypes } from './sign.interfaces';

export interface IReturnData {
  data: object | null;
  message: string;
}

export interface ISignServiceReturnData {
  id: string;
  name: string;
  email: string;
  role: RoleTypes;
  accessToken: string;
  refreshToken: string;
}
