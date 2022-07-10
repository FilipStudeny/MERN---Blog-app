import express from "express";
import { getUsers, loginUser, registerUser } from "../controllers/controller_USERS";
import { check } from 'express-validator';

export const route = express.Router();


route.get('/', getUsers);
route.post('/login', loginUser);
route.post('/register', [
    check('username').not().isEmpty(),
    check('email').not().isEmpty().normalizeEmail().isEmail(),
    check('password').not().isEmpty().isLength({min: 3})
], registerUser);


