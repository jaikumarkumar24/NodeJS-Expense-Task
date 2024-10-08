import mongoose from "mongoose";
const objectId = mongoose.Schema.Types.ObjectId;

const expensesSchema = new mongoose.Schema({
    expenses_id: { type: objectId },
    title:{ type: String },
    amount:{type:Number},
    category:{type:String},
    date:{type:Date}
})

const userSchema = new mongoose.Schema({
    username:{type: String},
    password:{type: String},
    email:{type: String},
    expenses:[expensesSchema]
})

const User = mongoose.model("User", userSchema,"user")
export default User;