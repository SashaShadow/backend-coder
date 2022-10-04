import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Msg, MessageSchema } from '../schemas/message.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Msg.name, schema: MessageSchema }])],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
