import * as dotenv from "dotenv";

// Node native imports
import path from "path";

// 3rd party pckg imports
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";

// Custom imports
import { fileFilter, fileStorage } from "./util/uploader";

// Routes
import teamRoutes from "./routes/teams";
import playerRoutes from "./routes/players";
import { generalErrorHandler } from "./util/error-handler";
import services from "./services";

dotenv.config();

// Variables
const app = express();
const staticDataPath = path.join(__dirname, "data");

// Middleware
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter,
}).single("csv"));
app.use("/data", express.static(staticDataPath));
app.use(bodyParser.json());

// Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


const serviceContainer = services();


// Route Handling
app.use("/", teamRoutes(serviceContainer));
app.use("/player", playerRoutes);

// Error handling
app.use(generalErrorHandler);

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
    console.error("Missing DB connection");
}

// DB connection
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        app.listen(8080);
    })
    .catch((err: any) => {
        console.log(err);
    });