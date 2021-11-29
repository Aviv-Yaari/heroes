import express from 'express';
import { catchAsync } from '../../middlewares/catchAsync.middleware';
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware';

import { getAll, getById, add, train, assign } from './hero.controller';

const router = express.Router();

router.get('/', requireAuth, catchAsync(getAll));
router.get('/:id', catchAsync(getById));
router.post('/', requireAdmin, catchAsync(add));
router.put('/:id/train', requireAuth, catchAsync(train));
router.put('/:heroId/assign/:userId?', requireAuth, catchAsync(assign));

export default router;
