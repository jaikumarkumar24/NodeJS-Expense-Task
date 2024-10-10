'use strict';
import { Router } from 'express';
import userRoutes from './userRoutes.js';
import expensesRoutes from './expenseRoutes.js';
const router = Router();

router.use('/auth', userRoutes);
router.use('/expenses',expensesRoutes);

export default router;