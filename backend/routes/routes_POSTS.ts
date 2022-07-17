import express from "express";
import { createNewPost, deletePost, getPostByID, getPostsByUserId, getPosts } from '../controllers/controller_POSTS';
import { check } from 'express-validator';
import { fileUpload } from "../middleware/middleware_file_upload";

export const route = express.Router();


route.get('/:postID', getPostByID);
route.get('/user/:userID', getPostsByUserId);

route.post('/', 
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('creator_id').not().isEmpty()
    ], 
    createNewPost);
route.delete('/:postID', deletePost)

