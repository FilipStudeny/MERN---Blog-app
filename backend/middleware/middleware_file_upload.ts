import multer from "multer";
import { v1 } from 'uuid';

const MIME_TYPE_MAP: any = {
    'image/png' : 'png',
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
}

export const fileUpload = multer({
    limits: {fileSize: 5000000},
    storage: multer.diskStorage({
        destination: (req: any, file: any, callback: any) => {
            callback(null, 'uploads/posts')

        },
        filename: (req: any, file, callback: any) => {
            const extension = MIME_TYPE_MAP[file.mimetype];
            callback(null, v1() + '.' + extension );
        }
        
    }),
    fileFilter: (req: any, file: any, callback: any) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type !');
        callback(error, isValid);
    }
});

export const userProfilePictureUpload = multer({
    limits: {fileSize: 5000000},
    storage: multer.diskStorage({
        destination: (req: any, file: any, callback: any) => {
            callback(null, 'uploads/users')

        },
        filename: (req: any, file, callback: any) => {
            const extension = MIME_TYPE_MAP[file.mimetype];
            callback(null, v1() + '.' + extension );
        }
        
    }),
    fileFilter: (req: any, file: any, callback: any) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type !');
        callback(error, isValid);
    }
});

