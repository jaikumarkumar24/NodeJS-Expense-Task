import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type: String},
    password:{type: String, unique: true},
    email:{type: String}
})

const User = mongoose.model("User", userSchema,"user")
export { User } ;