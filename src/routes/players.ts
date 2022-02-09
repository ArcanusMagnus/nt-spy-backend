import { Router } from "express";

import { updatePlayer, deletePlayer } from "../controllers/players";

const router = Router();

router.put('/:playerId', updatePlayer);
router.delete('/:playerId', deletePlayer);

export default router;