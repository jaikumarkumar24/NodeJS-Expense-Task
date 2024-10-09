'use strict';
import { addExpense,expensesByUserId,updateUserExpense,deleteUserExpenses} from '../../db/services/expenses.services.js';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../middleware/errorHandler.js';

const createExpense  = async (req, res, next)=>{
    try{
        const expense = await addExpense(req.user._id, req.body);
        res.status(StatusCodes.CREATED).json({ data: expense });
    }
    catch(error){
        next(new ErrorHandler(StatusCodes.BAD_REQUEST, error.message));
    }
}

const getExpensesByUserId = async (req, res, next) => {
    try {
        const params = { user: req.user._id }
        const expensesDetails = await expensesByUserId(params);
        res.status(StatusCodes.OK).json({ data: expensesDetails });
    } 
    catch (error) {
        next(new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
  };

  const updateExpenses = async(req, res, next)=>{
    try{
        const expense = await updateUserExpense(req.params.id, req.body);
        if (!expense) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Expense not found' });
          }
          res.status(StatusCodes.OK).json({ status: 'success', data: expense });
    }
    catch(error){
        next(new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
  }
  const deleteExpenses = async(req, res, next)=>{
    try{
        const expense = await deleteUserExpenses(req.params.id);
        if (!expense) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Expense not found' });
          }
          res.status(StatusCodes.OK).send({ status: 'success', data: expense });
    }
    catch(error){
        next(new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
  }

export {
    getExpensesByUserId,
    createExpense,
    updateExpenses,
    deleteExpenses
}