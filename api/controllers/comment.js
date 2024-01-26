import Comment from "../models/Comment.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async(req, res, next) => {
    try{
        const {content, postId, userId} = req.body;

        if(userId !== req.user.id){
            return next(errorHandler(403, 'Unauthorized'));
        }

        const newComment = new Comment({
            content,
            postId,
            userId
        });
        await newComment.save();
    }catch(error){
        next(error);
    }
}

export const getPostComments = async(req, res, next) => {
    try{
        const comments = await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1,
        });
    }catch(error){
        next(error);
    }
}














