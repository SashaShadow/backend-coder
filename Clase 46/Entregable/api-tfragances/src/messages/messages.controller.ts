import { Controller, Body, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './message.dto';
import { Msg, MessageDocument } from '../schemas/message.schema';


@Controller('/api/messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get()
    async getMessages(): Promise<Msg[]> {
        return this.messagesService.getMessages();
    }

    @Post()
    async createMessage(message: Msg): Promise<Msg> {
        return this.messagesService.createMessage(message);
    }
}
