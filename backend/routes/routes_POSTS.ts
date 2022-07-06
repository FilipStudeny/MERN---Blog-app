import express from "express";
import { createNewPost, getPlaceByID, getPostByUserId, getPosts } from '../controllers/controller_POSTS'

export const route = express.Router();


route.get('/:postID', getPlaceByID);
route.get('/user/:userID', getPostByUserId);

route.post('/', createNewPost);

