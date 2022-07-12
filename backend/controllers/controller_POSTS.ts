import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { POST } from "../models/model_Post";
import { USER } from "../models/model_User";

export const getPosts = (req: Request, res: Response, next: NextFunction) => {

    const error = {
            message: "Error couldn't find any posts",
            code: 404
    }

    throw next(error);
};

export const getPostByID = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.postID;
    let post: any;

    try {
        post = await POST.findById(postID);
    } catch (err) {
        const error = {
            message: "Error couldn't find any post by postID",
            code: 500
        };
    
        return next(error);
    }
    
    if(!post){
        const error = {
            message: "Error couldn't find any posts by postID in database",
            code: 404
        };
        return next(error);
    };
     
    return res.json({ post: post.toObject( {getters: true}) });
};


export const getPostsByUserId = async (req: Request, res: Response, next: NextFunction)  => {
    const userID = req.params.userID;
    let userWithPlaces: any;

    try {
        userWithPlaces = await USER.findById(userID).populate('posts');
    } catch (err) {
        const error = {
            message: "Fetching posts by userID failed !, try again",
            code: 500
        };
    
        return next(error);
    }

    if(!userWithPlaces || userWithPlaces.length === 0){

        const error = {
            message: "Error couldn't find any posts by userID in database",
            code: 404
        }
        return next(error);
    }

    return res.json({ posts: userWithPlaces.posts.map((p: { toObject: (arg0: { getters: boolean; }) => any; }) => p.toObject({getters: true})) });
};

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = {
            message: "Error invalid POST request",
            code: 422
        }
        throw next(error);
    }

    const { title, description, imageURL, creator, creator_name } = req.body;

    const newPost = new POST({
        title: title,
        description: description,
        imageURL: imageURL,
        creator_id: creator,
        creator_name: creator_name,
    });

    let user: any;
    try {
        user = await USER.findById(creator);
    } catch (err) {
        const error = {
            message: "Creating new post failed, try again !",
            code: 500
        }
        return next(error);
    }

    if(!user){
        const error = {
            message: "User couldn't be found by id !",
            code: 404
        };
        return next(error);
    }

    try{
        //FOR WEB BASED MONGO DB
        /*
        const session = await mongoose.startSession();
        session.startTransaction();
        await newPost.save({session: session});

        user.posts.push(newPost); //SAVE POST INTO USER
        await user.save({session: session});
        await session.commitTransaction();
        */

        //FOR LOCAL MONGODB
        await newPost.save();
        user.posts.push(newPost); //SAVE POST INTO USER
        await user.save();

    }catch (err){
        const error = {
            message: "Creating new post failed in sessions, try again !",
            code: 500
        }
        console.log(err);
        return next(error);
    }

    res.status(201).json({post: newPost});

};


export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.postID;
    let post: any;

    try {
        post = await POST.findById(postID).populate('creator');
    } catch (err) {
        const error = {
            message: "Couldn't delete POST !",
            code: 500
        };
    
        return next(error);
    }

    if(!post){
        const error = {
            message: "Post doesn't exist, so it could not be deleted !",
            code: 404
        };
    
        return next(error);
    }

    try{
       await post.remove();
       post.creator.posts.pull(post);
       await post.creator.save();
       
    }catch(err){
        const error = {
            message: "Couldn't delete POST from DATABASE!",
            code: 500
        };
    
        return next(error);
    }
    res.status(200).json({message: "Post deleted !"});
}