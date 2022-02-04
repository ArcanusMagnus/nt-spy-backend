"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node native imports
const path_1 = __importDefault(require("path"));
// 3rd party pckg imports
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
// Custom imports
const uploader_1 = require("./util/uploader");
// Routes
const teams_1 = __importDefault(require("./routes/teams"));
// Variables
const MONGODB_URI = 'mongodb+srv://arcanus:LL5!JYMcQnS7!at@cluster0.tlpvc.mongodb.net/ht-tool?retryWrites=true&w=majority';
const app = (0, express_1.default)();
// Middleware
app.use((0, multer_1.default)({ storage: uploader_1.fileStorage, fileFilter: uploader_1.fileFilter }).single('csv'));
app.use('/data', express_1.default.static(path_1.default.join(__dirname, 'data')));
// Route Handling
app.use('/', teams_1.default);
// Error handling: TODO
// DB connection
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    app.listen(8080);
})
    .catch((err) => {
    console.log(err);
});
