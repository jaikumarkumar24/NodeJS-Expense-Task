'use strict';
const router = Router();
import authenticateToken from '../../middleware/authendicate.js'

import { Router } from 'express';

import { getExpensesByUserId,createExpense,updateExpenses,deleteExpenses } from './expenses.module.js';

router.get('/',authenticateToken, getExpensesByUserId);
router.post('/',authenticateToken, createExpense);
router.put('/:id',authenticateToken, updateExpenses);
router.delete('/:id', deleteExpenses)

export default router;