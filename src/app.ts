// Node native imports
import path from "path";

// 3rd party pckg imports
import express, { NextFunction } from "express";
import mongoose, { Error } from "mongoose";
import multer from "multer";

// Custom imports
import { fileStorage, fileFilter } from "./util/uploader";

// Routes
import teamRoutes from './routes/teams';

// Variables
const MONGODB_URI = 'mongodb+srv://arcanus:LL5!JYMcQnS7!at@cluster0.tlpvc.mongodb.net/ht-tool?retryWrites=true&w=majority';
const app = express();
const staticDataPath = path.join(__dirname, 'data');

// Middleware
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('csv'));
app.use('/data', express.static(staticDataPath));

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// Route Handling
app.use('/', teamRoutes);

// Error handling: TODO
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     res.json({
//         message: error.message;
//     });
// });

// DB connection
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        app.listen(8080);
    })
    .catch((err: any) => {
        console.log(err);
    })