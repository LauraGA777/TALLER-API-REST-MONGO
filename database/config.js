import mongoose from 'mongoose';

export default async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log("Database connected successfully");

    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}