import { Router } from 'express';

import { getTeams, getOneTeam ,uploadCsvFile, deleteTeam } from '../controllers/teams';

const router = Router();

router.get('/teams', getTeams);
router.get('/teams/:teamId', getOneTeam);
router.post('/upload', uploadCsvFile);
router.delete('/teams/:teamId', deleteTeam);

export default router;