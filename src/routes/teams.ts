import { Router } from 'express';

import { getTeams, getOneTeam ,uploadCsvFile } from '../controllers/teams';

const router = Router();

router.get('/teams', getTeams);
router.get('/teams/:teamId', getOneTeam);
router.post('/upload', uploadCsvFile);

export default router;