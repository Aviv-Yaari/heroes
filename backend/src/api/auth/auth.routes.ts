import express from 'express';
import { catchAsync } from '../../middlewares/catchAsync.middleware';

import { getLoggedInUser, login, logout, signup } from './auth.controller';

const router = express.Router();

router.get('/current', catchAsync(getLoggedInUser));
router.post('/login', catchAsync(login));
router.post('/signup', catchAsync(signup));
router.post('/logout', catchAsync(logout));

export default router;
