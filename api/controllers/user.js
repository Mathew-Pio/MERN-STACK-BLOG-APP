import User from "../models/User.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update this user you stupid dumbfuck'))
    }
    if(req.body.password){
        if(req.body.password < 6){
        return next(errorHandler(400, 'Password must be at least 6 characters'))
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400, 'Username mmust be between 7 and 20 characters'))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain spaces'))
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be lowercase'))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username can only contain letters and numbers'))
        }
    }
        try{
            const id = req.params.userId;
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, {new:true});
            const {password, ...rest} = updatedUser._doc;
            res.status(200).json(rest);
        }catch(error){
            next(error);
        }
}