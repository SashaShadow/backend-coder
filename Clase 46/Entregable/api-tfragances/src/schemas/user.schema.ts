
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  phone: number;

  @Prop()
  photo: string;

  @Prop({required: false})
  admin: boolean;
}

export const UserSchema  = SchemaFactory.createForClass(User);
