import express from "express";
import { getUser, getUsers, loginUser, registerUser } from "../controllers/controller_USERS";
import { check } from 'express-validator';
import { userProfilePictureUpload } from "../middleware/middleware_file_upload";

export const route = express.Router();


route.get('/', getUsers);
route.get('/:userID', getUser);
route.post('/login', loginUser);
route.post('/register',
    userProfilePictureUpload.single('image'),
    [
        check('username').not().isEmpty(),
        check('email').not().isEmpty().normalizeEmail().isEmail(),
        check('password').not().isEmpty().isLength({min: 3})
    ], 
    registerUser);


