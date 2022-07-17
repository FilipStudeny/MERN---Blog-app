import { ErrorRequestHandler, Response, Request, NextFunction } from "express";
import fs from 'fs';

export const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {

    if(req.file){
        fs.unlink(req.file.path, (error) => {
            console.log(error);
        });
    }

    if(res.headersSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'Unknown error occured !"'
    });
};