import { Router } from "express";

import { updateNote } from "../controllers/players";

const router = Router();

router.put('/:playerId', updateNote);

export default router;