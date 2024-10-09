import User from '../models/user.model.js';

export const findUserByEmail = async(params)=>{
    return await User.find(params);
}

export const createUser = async(params)=>{
    return await User.create(params);
}

