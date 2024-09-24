import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createComment } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

// route pour ajouter un commentaire
commentRouter.post('/create-comment', verifyToken, createComment);

export default commentRouter