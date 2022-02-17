import { Router } from "express";

import { deleteTeam, getOneTeam, uploadCsvFile } from "../../controllers/teams";
import { ServiceContainer } from "../../services";
import getTeamsRoute from "./getTeamsRoute";

export default (services: ServiceContainer): Router => {

    const router = Router();

    getTeamsRoute(services, router);
    // TODO
    router.get("/teams/:teamId", getOneTeam);
    router.post("/upload", uploadCsvFile);
    router.delete("/teams/:teamId", deleteTeam);

    return router;
}
