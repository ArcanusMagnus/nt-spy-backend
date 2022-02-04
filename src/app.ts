// Node native imports
import path from "path";

// 3rd party pckg imports
import express from "express";
import mongoose from "mongoose";
import multer from "multer";

// Custom imports
import { fileStorage, fileFilter } from "./util/uploader";

// Routes
import teamRoutes from './routes/teams';

// Variables
const MONGODB_URI = 'mongodb+srv://arcanus:LL5!JYMcQnS7!at@cluster0.tlpvc.mongodb.net/ht-tool?retryWrites=true&w=majority';
const app = express();

// Middleware
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('csv'));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Route Handling
app.use('/', teamRoutes);

// Error handling: TODO

// DB connection
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        app.listen(8080);
    })
    .catch((err: any) => {
        console.log(err);
    })