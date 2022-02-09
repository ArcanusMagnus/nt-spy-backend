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
const body_parser_1 = __importDefault(require("body-parser"));
// Custom imports
const uploader_1 = require("./util/uploader");
// Routes
const teams_1 = __importDefault(require("./routes/teams"));
const players_1 = __importDefault(require("./routes/players"));
// Variables
const MONGODB_URI = 'mongodb+srv://arcanus:LL5!JYMcQnS7!at@cluster0.tlpvc.mongodb.net/ht-tool?retryWrites=true&w=majority';
const app = (0, express_1.default)();
const staticDataPath = path_1.default.join(__dirname, 'data');
// Middleware
app.use((0, multer_1.default)({ storage: uploader_1.fileStorage, fileFilter: uploader_1.fileFilter }).single('csv'));
app.use('/data', express_1.default.static(staticDataPath));
app.use(body_parser_1.default.json());
// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Route Handling
app.use('/', teams_1.default);
app.use('/player', players_1.default);
// Error handling: TODO
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     res.json({
//         message: error.message;
//     });
// });
// DB connection
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    app.listen(8080);
})
    .catch((err) => {
    console.log(err);
});
