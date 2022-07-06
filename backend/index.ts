import express, { Application, ErrorRequestHandler, Response } from "express";
import { errorHandler } from "./handlers/ErrorHandler";
import { route } from './routes/routes_POSTS';
import bodyParser from "body-parser";

const PORT: number = 8000;
const app: Application = express();


//*** MIDDLEWARE ***//
app.use(bodyParser.json());
app.use('/api/posts', route); // => /api/posts
app.use((req, res, next) => {
    const error = {
        message: "Error couldn't find this route",
        code: 404
    }

    throw error;
});
app.use(errorHandler); //ERROR HANDLING MIDDLEWARE


//*** BEEP BOOP ***//
app.listen(PORT, () => {
    console.log(`Your server available at http://localhost:${PORT}`);
})