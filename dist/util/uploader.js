"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.fileStorage = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
exports.fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '..', 'data'));
    },
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + '-' + file.originalname.replace(/\s/g, ""));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileFilter = fileFilter;
