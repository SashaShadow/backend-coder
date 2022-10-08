import { logger, loggerError } from "../utils/logger.js";
import MessageRepository from "../repository/messageRepository.js";
import MessageService from "../services/messageService.js";

export const messagesStorage = new MessageRepository();
export const messageService = new MessageService(messagesStorage);

export const getMessages = async (ctx) => {
    return messageService.getMsgs()
    .then(msgs => {
        ctx.status = 200;
        ctx.body = {
            mensajes: msgs
        }
    })
    .catch(err => {ctx.body = {error: err}; loggerError.error(err);})
}

export const createMessage = async (ctx) => {
    const newMsg = ctx.request.body;
    return messageService.createMsgs(newMsg)
    .then(_ => {
        logger.info('Mensaje creado')
    })
    .catch(err => loggerError.error(err));
}