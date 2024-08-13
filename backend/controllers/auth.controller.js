import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

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

