import User from '../models/user.model.js';

export const findUserByEmail = async(query)=>{
    try{
        const user = await User.find();
        if (!user) {
        throw new Error('User not found');
        }
        return user;
    }
    catch(error){
        console.error(`Error finding user by email: ${error.message}`);
        return null;
    }

}