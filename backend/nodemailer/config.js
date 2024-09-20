
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ouattarayacou494@gmail.com',
        pass: process.env.NODEMAILER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})



