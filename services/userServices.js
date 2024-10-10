import { User } from '../models/user.js';
import { generateAuthToken } from '../middleware/generateToken.js';
import { CONSTANTS } from '../config/constants.js';

class UserServices{
    async findUserByEmail(params){

        const user = await User.find({email:params.email});
        if (user.length && user[0] && user[0].username && user[0].email) {
                if(params.password === user[0].password){
                    return generateAuthToken(user[0]);
                }
                else{
                    throw new Error(CONSTANTS.INVALID_PASSWORD);
                }            
          }else{
            throw new Error(CONSTANTS.INVALID_EMAIL);
          }
    }
   
    async createUser(data){ 
        return await User.create(data);
    }
}

export const userServices = new UserServices();

