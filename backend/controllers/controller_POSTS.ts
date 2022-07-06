import { NextFunction, Request, Response } from "express";


const DUMMY_POSTS = [
    {
        id: "1",
        title: "YEEEY",
        description: "lorem ipsum sudo lomen",
        creator: "Nicole",
        userID: "nic123"

    },{
        id: "2",
        title: "YEEEY 2",
        description: "lorem ipsum sudo lomen",
        creator: "Bogo",
        userID: "bog"

    },{
        id: "3",
        title: "YEEEY 3",
        description: "lorem ipsum sudo lomen",
        creator: "Nicole",
        userID: "nic123"

    },{
        id: "4",
        title: "YEEEY 4",
        description: "lorem ipsum sudo lomen",
        creator: "Sarah",
        userID: "sar123"
    },
]

export const getPosts = (req: Request, res: Response, next: NextFunction) => {

    const error = {
            message: "Error couldn't find any posts",
            code: 404
    }

    throw next(error);
};

export const getPlaceByID = (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.postID;
    const post = DUMMY_POSTS.find( p => {
        return p.id === postID;
    });
    
    if(!post){
        const error = {
            message: "Error couldn't find any posts",
            code: 404
        }
    
        throw next(error);
    }
     
    return res.json({ post: post });
};


export const getPostByUserId = (req: Request, res: Response, next: NextFunction)  => {
    const userID = req.params.userID;
    const post = DUMMY_POSTS.find( p => {
        return p.creator === userID;
    })

    if(!post){

        const error = {
            message: "Error couldn't find any posts by userID",
            code: 404
        }
        return next(error);
    }

    return res.json({ post: post });
};


export const createNewPost =  (req: Request, res: Response, next: NextFunction) => {
    const { title, description, userID, user, postID } = req.body;

    const newPost = {
        title: title,
        description: description,
        userID: userID,
        creator: user,
        id: postID
    }

    DUMMY_POSTS.push(newPost);

    res.status(201).json({post: newPost});

};