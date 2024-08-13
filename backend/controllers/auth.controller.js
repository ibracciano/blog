import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password || username.length === 0 || email.length === 0 || password.length === 0) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // crypter le mot de passe 
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // creer un nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password || email.length === 0 || password.length === 0) {
        return res.status(400).json({ message: 'Email and password are required' })
    }
    try {
        // chercher si l'utilisateur existe
        const validateUser = await User.findOne({ email })
        if (!validateUser) {
            return res.status(400).json({ message: 'User not found' })
        }

        // vérifier si le mot de passe est correcte
        const validPassword = await bcryptjs.compare(password, validateUser.password)
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        // generer un token d'authentification
        const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET)

        // ne pas ramener le mot de passe de l'utilisateur
        const { password: pass, ...userWithoutPassword } = validateUser._doc


        // creer un cookie
        res.cookie('token', token, { httpOnly: true }).json(userWithoutPassword)


    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

export const google = async (req, res) => {
    const { username, email, photoURL } = req.body
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            // generer un token d'authentification
            const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET)

            // ne pas ramener le mot de passe de l'utilisateur
            const { password: pass, ...userWithoutPassword } = validateUser._doc


            // creer un cookie
            res.cookie('token', token, { httpOnly: true }).json(userWithoutPassword)
        } else {
            // générer un mot de passe aléatoire et sauvegarder l'utilisateur
            const generatePassword = Math.random().toString(36).slice(0, 8)

            // crypter le mot de passe 
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(generatePassword, salt)

            const newUser = new User({ username: username.toLowerCase().split(" ")[0], email, password: hashedPassword, photo: photoURL })
            await newUser.save()

            // generer un token d'authentification
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

            // ne pas ramener le mot de passe de l'utilisateur
            const { password: pass, ...userWithoutPassword } = newUser._doc


            // creer un cookie
            res.cookie('token', token, { httpOnly: true }).json(userWithoutPassword)


        }
    } catch (error) {

    }
}

