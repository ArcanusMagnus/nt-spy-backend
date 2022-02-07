import { Router } from 'express';

import { getTeams, uploadCsvFile } from '../controllers/teams';

const router = Router();

router.get('/', getTeams);
router.post('/upload', uploadCsvFile);

export default router;