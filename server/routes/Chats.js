import express from 'express';
import { Chat } from '../models/Chat.js';  // Assuming you have a Chat model
import { Message } from '../models/Message.js';  // Assuming you have a Message model
import {  userChats, getChatMessages, postChatMessages } from '../controllers/Chats.js';

const router = express.Router();

router.get('/', userChats)

router.get('/:chatId/messages', getChatMessages);

router.post('/:chatId/messages', postChatMessages);
  




export default router