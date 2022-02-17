import express from "express";

export type AsyncMiddlewareFunction = (req: express.Request, res: express.Response, next: Function) => Promise<void>;
export type MiddlewareFunction = (req: express.Request, res: express.Response, next: Function) => void;
export type Middleware = MiddlewareFunction | AsyncMiddlewareFunction;