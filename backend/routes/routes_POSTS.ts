import express from "express";
import { createNewPost, deletePost, getPostByID, getPostsByUserId, getPosts } from '../controllers/controller_POSTS';
import { check } from 'express-validator';

export const route = express.Router();


route.get('/:postID', getPostByID);
route.get('/user/:userID', getPostsByUserId);

route.post('/', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 1}),
    check('creator').not().isEmpty()
], 
    createNewPost);
route.delete('/:postID', deletePost)

