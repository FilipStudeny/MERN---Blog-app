import { ErrorRequestHandler, Response, Request, NextFunction } from "express";


export const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'Unknown error occured !"'
    });
};