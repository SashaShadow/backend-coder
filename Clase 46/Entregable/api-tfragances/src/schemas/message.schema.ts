
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Msg & Document;

@Schema()
export class Msg {
  @Prop()
  author: string;

  @Prop()
  text: string;

  @Prop()
  time: string;
}

export const MessageSchema  = SchemaFactory.createForClass(Msg);
