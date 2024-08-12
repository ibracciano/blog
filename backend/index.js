import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();




const app = express();
const port = process.env.PORT || 3000;

// connection à la base de données
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
})

// ecoute du port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

