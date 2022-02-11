import { Router } from "express";

import { updatePlayer, deletePlayer, getPlayer } from "../controllers/players";

const router = Router();

router.get('/:playerId', getPlayer);
router.put('/:playerId', updatePlayer);
router.delete('/:playerId', deletePlayer);

export default router;