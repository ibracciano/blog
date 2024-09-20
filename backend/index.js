import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/config.js';


dotenv.config();

const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3000;

// middleware pour accepter les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));






app.use('/api/user', userRouter)

// connection à la base de données


// app.get('/mail', (req, res) => {
//     let mailOptions = {
//         from: 'MyBlog@gmail.com',
//         to: 'ouattarayacou494@gmail.com',
//         subject: 'Sending Email using Node.js',
//         text: 'Hello World!'
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.send('Error sending email')
//         } else {
//             console.log('Email sent: ', info.response);
//             res.send('Email sent successfully')
//         }
//     })
// })

// ecoute du port
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});


