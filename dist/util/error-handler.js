"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalErrorHandler = void 0;
const generalErrorHandler = (error, req, res, next) => {
    const message = error.message;
    const data = error.data;
    res.json({
        message: message,
        data: data
    });
};
exports.generalErrorHandler = generalErrorHandler;
