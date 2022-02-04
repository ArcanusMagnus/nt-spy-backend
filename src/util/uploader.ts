import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
        cb(null, 'data')
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        cb(null, v4() + '-' + file.originalname)
    }
});

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'text/csv' &&
        file.size <= 50000) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};