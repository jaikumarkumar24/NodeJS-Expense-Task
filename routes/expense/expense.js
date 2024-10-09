'use strict';
const router = Router();
import authenticateToken from '../../middleware/authendicate.js';

import { ValidateReq } from '../../middleware/inputSchemaValidate/inputValidation.js'
import { expensesCreateSchema,expensesUpdateSchema,expenseParamSchema } from '../../middleware/inputSchemaValidate/expenseDataValidate.js'

import { Router } from 'express';

import { getExpensesByUserId,createExpense,updateExpenses,deleteExpenses } from './expenses.module.js';

router.get('/',authenticateToken, getExpensesByUserId);
router.post('/',authenticateToken,ValidateReq(expensesCreateSchema,"body"), createExpense);
router.put('/:id',authenticateToken,ValidateReq(expenseParamSchema,"params"),ValidateReq(expensesUpdateSchema,"body"), updateExpenses);
router.delete('/:id',authenticateToken,ValidateReq(expenseParamSchema,"params"), deleteExpenses)

export default router;