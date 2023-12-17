import { IReturnData } from '../interfaces/returnData.interface';

export function generateResponse(
  message: string,
  data: object | null = null,
): IReturnData {
  return { data, message };
}
