import express, { Application, Response, Request, NextFunction  } from "express";
import { errorHandler } from "./handlers/ErrorHandler";
import { route as postRoutes } from './routes/routes_POSTS';
import bodyParser from "body-parser";
import { route as userRoutes} from "./routes/routes_USERS";
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import path from "path";

const PORT: number = 8000;
const app: Application = express();


//*** MIDDLEWARE ***//
dotenv.config();
app.use(bodyParser.json());
app.use('/uploads/users', express.static(path.join('uploads/users/')));
app.use('/uploads/posts', express.static(path.join('uploads/posts/')));

app.use((req: Request, res: Response, next: NextFunction) => {
    
    //CORS FIX
    //ADD HEADER TO REQUREESTS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    
    next();
});

app.use('/api/users', userRoutes); // => /api/posts
app.use('/api/posts', postRoutes); // => /api/posts
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = {
        message: "Error couldn't find this route",
        code: 404
    }

    throw error;
});
app.use(errorHandler); //ERROR HANDLING MIDDLEWARE


const url = process.env.MONGO_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.Promise = global.Promise;
mongoose.connect(url!, options)
.then(() => {console.log("Connected to MongoDB")})
.catch((err) => console.log(err));


 //*** BEEP BOOP ***//
 app.listen(PORT, () => {
    console.log(`Your server available at http://localhost:${PORT}`);
})