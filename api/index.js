import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'

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
app.use(express.json())
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    connectDb();
})
