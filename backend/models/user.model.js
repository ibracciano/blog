import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        default: ""
    },

    // date de la dernière connexion de l'utilisateur
    lastLogin: {
        type: Date,
        default: Date.now
    },

    role: {
        type: String,
        default: 'user'
    },

    // voir si l'utilisateur a confirmé son email
    isVerify: {
        type: Boolean,
        default: false
    },

    // code de vérification dans l'email
    verifyCode: String,

    // date de l'expiration du code de vérification
    verifyCodeExpiredAt: Date,

    // code de vérification de l'email de reinitialisation du mot de passe
    resetPasswordCode: String,

    // date de l'expiration du code de vérification de l'email de reinitialisation du mot de passe
    resetPasswordCodeExpiredAt: Date

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;