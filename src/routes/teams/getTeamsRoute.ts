import { ServiceContainer } from "../../services";
import express, { Router } from "express";
import { Middleware } from "../abstractRoute";

const validation = (req: express.Request, res: express.Response, next: Function) => {
    next();
};

const handler = (serviceConteiner: ServiceContainer): Middleware => {
    return (req: express.Request, res: express.Response) => {
        const {
            playerService,
        } = serviceConteiner;

        res.status(200).json(playerService.getPlayerModel(0));
    };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
    router.get("/teams", validation, handler(serviceContainer));
    return router;
}