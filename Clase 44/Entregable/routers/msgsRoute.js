import express from "express";
import { getMessages, createMessage } from "../controllers/messagesController.js";
const { Router } = express;
const messagesRouter = Router()

export default messagesRouter;

messagesRouter.get('/', getMessages);
messagesRouter.post('/', createMessage);