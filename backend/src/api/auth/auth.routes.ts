import express from 'express';

import { getLoggedInUser, login, signup } from './auth.controller';

const router = express.Router();

router.get('/current', getLoggedInUser);
router.post('/login', login);
router.post('/signup', signup);

export default router;
