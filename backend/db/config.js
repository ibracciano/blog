import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    })
}