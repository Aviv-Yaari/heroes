import express from 'express';

import { getLoggedInUser, login, logout, signup } from './auth.controller';

const router = express.Router();

router.get('/current', getLoggedInUser);
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;
