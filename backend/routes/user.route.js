import express from 'express';
import { checkAuth, forgotPassword, google, logout, resetPassword, signin, signup, userRemoveProfile, userUpdateProfile, verifyEmail } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const userRouter = express.Router();

// route pour s'inscrire un utilisateur
userRouter.post('/signup', signup)


// route pour connecter un utilisateur
userRouter.post('/signin', signin)


// route pour deconnecter un utilisateur
userRouter.post('/logout', logout)

// route pour vérification de l'email
userRouter.post('/verify-email', verifyEmail)

// route pour mot de passe oublié
userRouter.post('/forgot-password', forgotPassword)

// route pour mot de passe oublié
userRouter.post('/reset-password/:code', resetPassword)

// verifier si un utilisateur es authentifié ou non
userRouter.get("/check-auth", verifyToken, checkAuth)

// route pour se connecter avec Google
userRouter.post('/google', google)

// route pour modifier le profile de l'utilisateur
userRouter.post('/update-profile', verifyToken, userUpdateProfile)

// route pour supprimer un utilisateur
userRouter.post('/remove-profile', verifyToken, userRemoveProfile)


export default userRouter