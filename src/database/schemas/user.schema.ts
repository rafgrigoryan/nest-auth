import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value); // Basic email format validation
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  })
  email: string;

  @Prop({
    required: true,
    minlength: 8,
    maxlength: 100,
  })
  password: string;

  @Prop({ default: Date.now }) // Set default value to current date/time
  createdAt: Date;

  @Prop({ default: null }) // To mark user as deleted, set this value to the deletion date/time
  deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
