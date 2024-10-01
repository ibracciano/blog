import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import cryptoRandomString from 'crypto-random-string';
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js'
import { sendEmailResetPassword, sendEmailVerification, sendEmailWelcome, sendResetSuccessEmail } from '../nodemailer/email.js'


export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password || !username) {
            throw new Error('Tous les champs sont requis')
        }
        // verifier si l'utilisateur existe déjà
        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ success: false, message: 'Cet utilisateur existe déjà' })
        }

        // crypter le mot de passe 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // generer un code de verification
        const code = Math.floor((Math.random() * 900000) + 100000).toString()

        // creer un nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verifyCode: code,
            verifyCodeExpiredAt: Date.now() + 24 * 60 * 60 * 1000 // expire dans 24 heures

        })

        // sauvegarder l'utilisateur dans la base de données
        const userSaved = await newUser.save()


        // generer tokent et cookie
        generateTokenAndCookie(res, userSaved._id)


        // envoyer un email de verification
        sendEmailVerification(userSaved.email, userSaved.verifyCode)



        // renvoyer une reponse
        res.status(201).json({
            success: true, message: 'Enregistrement reussi', data: {
                ...userSaved._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.error("Erreur lors de l'enregistrement", error)
        res.status(500).json({ success: false, message: "Erreur lors de l'enregistrement" })
    }
}

// signin controller
export const signin = async (req, res) => {
    // extraire les informations de la requête
    const { email, password } = req.body

    try {
        // verifier si l'utilisateur existe
        const user = await User.findOne({ email })

        // si l'utilisateur n'existe pas
        if (!user) {
            return res.status(400).json({ success: false, message: "utilisateur ou mot de passe incorrect" })
        }

        // vérifier si le mot de passe est correct
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "utilisateur ou mot de passe incorrect" })
        }
        // console.log(user._id)
        // générer un token
        generateTokenAndCookie(res, user._id)

        // modifier les information de l'utilisateur
        user.lastLogin = new Date()

        // sauvegarder les modifications
        await user.save()

        // renvoyer les informations de l'utilisateur sans le mot de passe
        res.json({
            success: true, message: "Connexion réussie", data: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.error("Erreur lors de la connexion", error)
        res.status(500).json({ success: false, message: "Erreur lors de la connexion" })
    }

}
// logout controller
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: 'Deconnexion reussie' });
}

// forgot password controller
export const forgotPassword = async (req, res) => {
    // extraire l'email de la requête
    const { email } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Email non trouvé" })
        }

        // générer un nouveau code de vérification
        const newCode = cryptoRandomString({ length: 32, type: 'alphanumeric' })
        const newCodeExpireAt = Date.now() + 1 * 60 * 60 * 1000

        // mettre à jour le code de vérification et la date d'expiration
        user.resetPasswordCode = newCode
        user.resetPasswordCodeExpiredAt = newCodeExpireAt

        // sauvegarder les modifications
        await user.save()

        // envoyer un email de réinitialisation du mot de passe
        sendEmailResetPassword(user.email, `${process.env.CLIENT_URL}/reset-password/${newCode}`)

        // envoyer une réponse
        res.status(200).json({ success: true, message: "Email de réinitialisation du mot de passe envoyé" })
    } catch (error) {
        console.log("Erreur dans le forgot password", error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// vérification email controller
export const verifyEmail = async (req, res) => {
    // extraire le code de vérification
    const { code } = req.body

    try {
        // vérifier si un utilisateur avec ce code existe
        const user = await User.findOne({ verifyCode: code, verifyCodeExpiredAt: { $gt: Date.now() } })

        // si l'utilisateur n'existe pas
        if (!user) {
            return res.status(400).json({ success: false, message: "Code de vérification invalide ou expiré" })
        }

        // si l'utilisateur existe alors supprimer le code de vérification et mettre la vérification à true
        user.isVerify = true
        user.verifyCode = undefined
        user.verifyCodeExpiredAt = undefined

        // sauvegarder les modifications
        await user.save()

        // envoyer un email de bienvenue
        sendEmailWelcome(user.email, user.username)

        // envoyer une reponse
        res.status(200).json({
            success: true, message: "Votre compte est maintenant vérifié", data: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

// controller reinitialisation de mot de passe
export const resetPassword = async (req, res) => {
    // console.log(req.params)
    const { code } = req.params
    // console.log(token)

    const { password } = req.body

    try {
        // vérifier si un utilisateur avec ce token existe
        const user = await User.findOne({ resetPasswordCode: code, resetPasswordCodeExpiredAt: { $gt: Date.now() } })

        // si l'utilisateur n'existe pas
        if (!user) {
            return res.status(400).json({ success: false, message: "Code de réinitialisation du mot de passe invalide ou expiré" })
        }

        // si l'utilisateur existe alors crypter le mot de passe et supprimer les codes
        const hashedPassword = await bcryptjs.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordCode = undefined
        user.resetPasswordCodeExpiredAt = undefined

        // sauvegarder les modifications
        await user.save()

        // envoyé un email de succès 
        sendResetSuccessEmail(user.email)

        // envoyer une réponse
        res.status(200).json({
            success: true, message: "Votre mot de passe a été réinitialisé avec succès", user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Erreur dans le reset password", error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// controller pour récupérer les informations d'un utilisateur
export const checkAuth = async (req, res) => {
    const userId = req.userId
    // console.log(req.userId)
    // si le token es valide alors recherché l'utilisateur qui a ce token
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "message: 'Utilisateur non authentifié'" })
        }

        // renvoyer les informations de l'utilisateur sans le mot de passe
        res.status(201).json({ success: true, user: { ...user._doc, password: undefined } })
    } catch (error) {
        console.error("Erreur dans checkAuth", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const google = async (req, res) => {
    const { username, email, photoURL } = req.body
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            // generer un token d'authentification
            userExist.isVerify = true
            userExist.verifyCode = undefined
            userExist.verifyCodeExpiredAt = undefined
            userExist.lastLogin = new Date()
            userExist.photo = photoURL

            // sauvegarder les modifications
            const userExistSaved = await userExist.save()

            // generer un token d'authentification
            generateTokenAndCookie(res, userExistSaved._id)

            // sendEmailWelcome(userExist.email, userExist.username)

            return res.status(200).json({
                success: true, message: "Connexion réussie", data: {
                    ...userExistSaved._doc,
                    password: undefined
                }
            })
        } else {
            // générer un mot de passe aléatoire et sauvegarder l'utilisateur
            const generatePassword = Math.random().toString(36).slice(0, 8)

            // crypter le mot de passe 
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(generatePassword, salt)

            const newUser = new User({ username: username.toLowerCase().split(" ")[0], email, password: hashedPassword, photo: photoURL })
            newUser.isVerify = true
            newUser.verifyCode = undefined
            newUser.verifyCodeExpiredAt = undefined
            newUser.lastLogin = new Date()

            // sauvegarder l'utilisateur
            await newUser.save()

            // generer un token d'authentification
            generateTokenAndCookie(res, newUser._id)

            return res.status(200).json({
                success: true, message: "Connexion réussie", data: {
                    ...newUser._doc,
                    password: undefined
                }
            })

        }
    } catch (error) {
        console.error("Erreur lors de connexion google", error)
        res.status(500).json({ success: false, message: "Erreur lors de connexion google" })
    }
}


// route pour modifier le profil utilisateur
export const userUpdateProfile = async (req, res) => {
    try {
        // verifier si l'utilisatateur est connecté
        const userId = req.userId

        if (!userId) {
            return res.status(404).json({ success: false, message: "Veuillez vous connecter" })
        }

        // recuperation des données de la requête
        const { username, email, photo, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" })
        }
        user.photo = photo
        user.username = username

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
            user.password = hashedPassword
        }

        // sauvegarder les modifications
        await user.save()

        return res.status(200).json({
            success: true, message: "Profil modifié avec succès", data: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.error("Erreur dans la modification du profile", error)
        res.status(500).json({ success: false, message: "Erreur dans la modification du profile" })
    }


}

// route pour supprimer un utilisateur
export const userRemoveProfile = async (req, res) => {
    // recuperation des données de la requête
    const { id } = req.body

    try {
        // verifier si l'utilisateur est connecté
        const userId = req.userId

        if (!userId) {
            return res.status(404).json({ success: false, message: "Veuillez vous connecter" })
        }




        // vérifier si l'utilisateur existe
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" })
        }

        // supprimer l'utilisateur
        await User.findByIdAndDelete(id)

        return res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès" })
    } catch (error) {
        console.error("Erreur dans la suppression du profile", error)
        res.status(500).json({ success: false, message: "Erreur dans la suppression du profile" })
    }
}

// route pour recuperer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        // récupérer tous les utilisateurs
        const users = await User.find({})
        const totalUsers = User.countDocuments()

        return res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.error("Erreur dans la récupération des utilisateurs", error)
        res.status(500).json({ success: false, message: "Erreur dans la récupération des utilisateurs" })
    }
}

export const deleteSingleUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body


        if (!userId) {
            return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
        }


        await User.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès" });

    } catch (error) {
        console.error("Erreur dans deleteSingleUser", error)
        res.status(500).json({ success: false, message: "Erreur dans deleteSingleUser" })
    }

}
