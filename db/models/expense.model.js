import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now }
  });


const Expenses = mongoose.model("Expenses", expenseSchema,"expenses")
export default Expenses;