import { Document } from 'mongoose';

export interface IUserSchema extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
