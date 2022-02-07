import path from "path";

import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
        cb(null, path.join(__dirname, '..', 'data'));
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        cb(null, v4() + '-' + file.originalname.replace(/\s/g, ""));
    }
});

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};