import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.js'
import commentRoutes from './routes/comment.js';

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
app.use(cookieParser())
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})



app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    connectDb();
})
