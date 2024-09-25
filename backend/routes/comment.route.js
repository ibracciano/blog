import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createComment, getCommentsByPostId } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

// route pour ajouter un commentaire
commentRouter.post('/create-comment', verifyToken, createComment);

// route pour recuperer tous les commentaires d'un post
commentRouter.get('/get-comments/:postId', verifyToken, getCommentsByPostId);

export default commentRouter