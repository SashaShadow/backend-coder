import Router from 'koa-router';
import { getMessages, createMessage } from "../controllers/messages.controller.js";

const messagesRouter = new Router({
    prefix: '/api/messages'
})

export default messagesRouter;

messagesRouter.get('/', getMessages);
messagesRouter.post('/', createMessage);