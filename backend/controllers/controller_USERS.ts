import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { USER } from "../models/model_User";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    let users: any;
    
    try {
        users = await USER.find({}, '-password');
    } catch (err) {
        const error = {
            message: "Couldn't fetch any users, try again later !",
            code: 500
        };
        return next(error);
    }
    return res.json({ users: users.map((u: { toObject: (arg0: { getters: boolean; }) => any; }) => u.toObject({getters: true})) });
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = {
            message: "Error invalid POST request",
            code: 422
        }
        return next(error);
    }

    const { username, email, password, user_image } = req.body;
    let existingUser: any;

    try {
        existingUser = await USER.findOne({ email: email});
    } catch (err) {
        const error = {
            message: "Register failed, try again later !",
            code: 500
        }
        return next(error);
    }

    if(existingUser){
        const error = {
            message: "User already exists, please login instead !",
            code: 422
        };
        return next(error);
    }

    let hashedPasswd;
    try{
        hashedPasswd = await bcrypt.hash(password, 12);
    }catch(err){
        const error = {
            message: "Error hashing password !",
            code: 422
        };
        return next(error);
    }

    const newUser = new USER({
        username: username,
        email: email,
        password: hashedPasswd,
        user_image: user_image,
        posts: [],
    });

    try{
        await newUser.save();
    }catch (err){
        const error = {
            message: "Sign up failed, try again later !",
            code: 500
        }
        return next(error);
    }

    //JWT TOKEN GENERATION
    let token;
    try {
        token = await jwt.sign(
            {
                userID: newUser.id,
                username: newUser.username, 
                email: newUser.email }, 
            'supersepcretkey',
            {
                expiresIn: '1h'
            }
        );
    } catch (err) {
        const error = {
            message: "Sign up failed, try again later !",
            code: 500
        }
        return next(error);
    }

    res.status(201).json({userID: newUser.id, username: newUser.username, token: 'asdasdasdasda'});
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let existingUser: any;

    try {
        existingUser = await USER.findOne({ email: email});
    } catch (err) {
        const error = {
            message: "Login failed, try again later !",
            code: 500
        };
        return next(error);
    }

    if(!existingUser){
        const error = {
            message: "Invalid credentials, try again !",
            code: 401
        };
        return next(error);
    }

    let isPasswordValid;
    try{
        isPasswordValid = await bcrypt.compare(password, existingUser.password);
    }catch(err){
        const error = {
            message: "Could not log in, try again !",
            code: 422
        };
        return next(error);
    }

    if(!isPasswordValid){
        const error = {
            message: "Invalid credentials, try again !",
            code: 401
        };
        return next(error);
    }

    //JWT TOKEN GENERATION
    let token;
    try {
        token = await jwt.sign(
            {
                userID: existingUser.id,
                username: existingUser.username, 
                email: existingUser.email }, 
            'supersepcretkey',
            {
                expiresIn: '1h'
            }
        );
    } catch (err) {
        const error = {
            message: "Loging in failed, try again later !",
            code: 500
        }
        return next(error);
    }

    return res.json({userID: existingUser.id, username: existingUser.username, token: token});
};
