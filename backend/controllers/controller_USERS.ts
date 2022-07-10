import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { USER } from "../models/model_User";

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

    const newUser = new USER({
        username: username,
        email: email,
        password: password,
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
    res.status(201).json({user: newUser.toObject({getters: true})});
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

    if(!existingUser || existingUser.password !== password){
        const error = {
            message: "Invalid credentials, try again !",
            code: 401
        };
        return next(error);
    }

    return res.json({message: "loged In !"});
};
