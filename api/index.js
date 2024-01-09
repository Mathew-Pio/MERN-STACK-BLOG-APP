import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodb = process.env.MONGODB_URL;
mongoose.set('strictQuery', false);

const connectDb = async() => {
    try{
        await mongoose.connect(mongodb)
        console.log('Database is running..')
    }catch(err){
        console.log(err)
    }
}

const app = express();

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    connectDb();
})

app.get()