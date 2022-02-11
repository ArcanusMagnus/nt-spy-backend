import { ErrorRequestHandler } from "express";

export const generalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const message = error.message;
    const data = error.data;
    res.json({
        message: message,
        data: data
    });
};