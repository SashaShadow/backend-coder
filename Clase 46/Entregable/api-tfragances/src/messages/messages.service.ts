import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Msg, MessageDocument } from '../schemas/message.schema';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Msg.name) private messageModel: Model<MessageDocument>) {}

    async getMessages(): Promise<Msg[]> {
        return this.messageModel.find();
    }

    async createMessage(message: Msg): Promise<Msg> {
        const newMsg = new this.messageModel(message);
        return newMsg.save();
    }
}
