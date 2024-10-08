'use strict';

import { Router } from 'express';
const router = Router();

import userDetails from './user/user.js';

router.use('/auth', userDetails);

export default router;