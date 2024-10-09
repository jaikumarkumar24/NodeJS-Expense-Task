import mongoose from "mongoose";
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username:{type: String},
    password:{type: String},
    email:{type: String}
})

const User = mongoose.model("User", userSchema,"user")
export default User;