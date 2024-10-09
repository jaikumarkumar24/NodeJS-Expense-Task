'use strict';

import { Router } from 'express';
const router = Router();

import userDetails from './user/user.js';
import expenses from './expense/expense.js'

router.use('/auth', userDetails);
router.use('/expenses',expenses);


export default router;