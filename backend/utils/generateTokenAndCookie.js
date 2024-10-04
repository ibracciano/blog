
import jwt from 'jsonwebtoken'

export const generateTokenAndCookie = (res, userId) => {

    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

    // Set JWT token in cookie
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,//process.env.NODE_ENV === "production", //false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    // console.log(token)

    // console.log("Generated Token: ", token);
    return token
}