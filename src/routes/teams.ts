import { Router } from 'express';

import { getTeams } from '../controllers/teams';

const router = Router();

router.get('/', getTeams);

export default router;