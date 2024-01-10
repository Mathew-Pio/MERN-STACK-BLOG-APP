import User from '../models/User.js';
import bcrypt from 'bcryptjs'

export const signup = async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message:'All fields are required'})
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });           
    try{
        await newUser.save();
        return res.status(201).json({message:'Signup successful'})
    }catch(err){
        return res.status(500).json({err})
    }
}

