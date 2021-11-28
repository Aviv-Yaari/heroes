import express from 'express';
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware';

import { getAll, getById, add, train, assign } from './hero.controller';

const router = express.Router();

router.get('/', requireAuth, getAll);
router.get('/:id', getById);
router.post('/', requireAuth, requireAdmin, add);
router.put('/:id/train', requireAuth, train);
router.put('/:heroId/assign/:userId?', requireAuth, assign);

export default router;
