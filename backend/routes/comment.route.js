import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createComment, getCommentsByPostId, likeComment } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

// route pour ajouter un commentaire
commentRouter.post('/create-comment', verifyToken, createComment);

// route pour recuperer tous les commentaires d'un post
commentRouter.get('/get-comments/:postId', verifyToken, getCommentsByPostId);

// route pour mettre à jour les likes d'un commentaire
commentRouter.put('/likeComment/:commentId', verifyToken, likeComment);

export default commentRouter