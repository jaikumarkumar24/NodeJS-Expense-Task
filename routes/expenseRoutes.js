'use strict';
import { Router } from 'express';
import { authenticateToken } from '../middleware/index.js'
import { expensesController } from '../controllers/index.js';
import { ValidateReq } from '../utils/validation/inputValidation.js'
import validationSchema from '../utils/validation/expenseDataValidate.js'
const router = Router();


router.post('/',authenticateToken,ValidateReq(validationSchema.expensesCreateSchema,"body"), expensesController.createExpense);
router.get('/',authenticateToken, expensesController.getExpensesByUserId);
router.put('/:id',authenticateToken,ValidateReq(validationSchema.expenseParamSchema,"params"),ValidateReq(validationSchema.expensesUpdateSchema,"body"), expensesController.updateExpenses);
router.delete('/:id',authenticateToken,ValidateReq(validationSchema.expenseParamSchema,"params"), expensesController.deleteExpenses)

export default router;