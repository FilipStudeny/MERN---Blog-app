import express, { Router } from "express";
import { createNewPost, deletePost, getPostByID, getPostsByUserId, getPosts } from '../controllers/controller_POSTS';
import { check } from 'express-validator';
import { fileUpload } from "../middleware/middleware_file_upload";
import { authorization } from "../middleware/autentication";

export const route = express.Router();


route.get('/', getPosts);
route.get('/:postID', getPostByID);
route.get('/user/:userID', getPostsByUserId);

route.use(authorization);

route.post('/', 
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('creator_id').not().isEmpty()
    ], 
    createNewPost);
route.delete('/:postID', deletePost)

