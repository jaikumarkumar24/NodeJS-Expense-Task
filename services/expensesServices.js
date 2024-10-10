import Expenses from '../models/expense.js';
import { CONSTANTS } from '../config/constants.js';

class ExpensesServices{
    async addExpense(userId, expenseData){
        const expense = new Expenses({ ...expenseData, user: userId });
        const expenseResponse = await expense.save();
        if(!expenseResponse){
            throw new Error(CONSTANTS.INVALID_INPUT)
        }
        return expenseResponse;
    }

    async expensesByUserId(params){
        const expenses = await Expenses.find(params);
        if(!expenses.length){
            throw new Error(CONSTANTS.INVALID_INPUT)
        }
        return expenses;
    };

    async updateUserExpense(id,updateData){
        return await Expenses.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async deleteUserExpenses(id){
        return await Expenses.findByIdAndDelete(id)
    }   
}
export const expensesServices = new ExpensesServices();