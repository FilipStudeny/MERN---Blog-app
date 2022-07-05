import express, { Application, Express } from "express";
import { router } from './routes/routes_POSTS';

const PORT: number = 8000;
const app: Application = express();
const routesss = router;



//*** MIDDLEWARE ***//
app.use('/api/posts', routesss); // => /api/posts

app.listen(PORT, () => {
    console.log(`Your server available at http://localhost:${PORT}`);
})