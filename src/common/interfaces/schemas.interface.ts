import { Document } from 'mongoose';
import { RoleTypes } from './sign.interfaces';

export interface IUserSchema extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: RoleTypes;
}
