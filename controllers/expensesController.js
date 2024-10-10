'use strict';
import { expensesServices } from '../services/index.js';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../middleware/errorHandler.js';
import { CONSTANTS } from '../config/constants.js';

class ExpensesController{
    async createExpense(req, res, next){
        try{
            const expense = await expensesServices.addExpense(req.user._id, req.body);
            res.status(StatusCodes.CREATED).json(expense);
        }
        catch(error){
            next(new ErrorHandler(StatusCodes.BAD_REQUEST, error.message));
        }
    }
    
    async getExpensesByUserId(req, res, next){
        try {
            const expensesDetails = await expensesServices.expensesByUserId({ user: req.user._id });
            res.status(StatusCodes.OK).json(expensesDetails);
        } 
        catch (error) {
            next(new ErrorHandler(StatusCodes.NOT_FOUND, error.message));
        }
      };

      async updateExpenses(req, res, next){
        try{
            const expense = await expensesServices.updateUserExpense(req.params.id, req.body);
            if (!expense) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: CONSTANTS.EXPENSES_NOT_FOUND });
            }
            return res.status(StatusCodes.OK).json({ message: CONSTANTS.EXPENSES_DELETED });
        }
        catch(error){
            next(new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
        }
      }

      async deleteExpenses(req, res, next){
        try {
            const expense = await expensesServices.deleteUserExpenses(req.params.id);
            if (!expense) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: CONSTANTS.EXPENSES_NOT_FOUND });
            }
            return res.status(StatusCodes.OK).json({ message: CONSTANTS.EXPENSES_DELETED });
        } catch (error) {
            next(new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
        }
      }
}

export const expensesController = new ExpensesController()