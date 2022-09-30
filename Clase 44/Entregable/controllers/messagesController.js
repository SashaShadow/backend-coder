import { logger, loggerError } from "../utils/logger.js";
import MessageRepository from "../repository/messageRepository.js";
import MessageService from "../services/messageService.js";

export const messagesStorage = new MessageRepository();
export const messageService = new MessageService(messagesStorage);

export const getMessages = async (req, res) => {
    return messageService.getMsgs()
    .then(msgs => {
        res.json(msgs);
    })
    .catch(err => {res.send(err); loggerError.error(err);})
}

export const createMessage = async (req, res) => {
    const newMsg = req.body;
    return messageService.createMsgs(newMsg)
    .then(_ => {
        logger.info('Mensaje creado')
    })
    .catch(err => loggerError.error(err));
}