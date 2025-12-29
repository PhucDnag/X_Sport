import express from 'express';
import { chatWithAI } from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/ask', chatWithAI);

export default chatRouter;