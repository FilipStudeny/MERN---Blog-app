import jwt from 'jsonwebtoken';

export const authorization = async (req: any, res:any, next: any) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
       
        const decodedToken: any = await jwt.verify(token, 'supersepcretkey');

        req.userData = {
            creator_id: decodedToken.userID,
        };
        next();
    
    } catch (err) {
        const error = {
            message: "Invalid path, Authentication failed",
            code: 401
        }
        return next(error);
    }
   
    





};