import Expenses from '../models/expense.model.js';

const addExpense = async (userId, expenseData) => {
    const expense = new Expenses({ ...expenseData, user: userId });
    return await expense.save();
}

const expensesByUserId = async (params) => {
    return await Expenses.find(params);
};

const updateUserExpense = async(id,updateData)=>{
    return await Expenses.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

const deleteUserExpenses = async(id)=>{
    return await Expenses.findByIdAndDelete(id)
}

export {
    addExpense,
    expensesByUserId,
    updateUserExpense,
    deleteUserExpenses
}