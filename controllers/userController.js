'use strict';
import { userServices } from '../services/index.js'
import { ErrorHandler } from '../middleware/errorHandler.js'
import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from '../config/constants.js';

class UserController{

    async userRegister(req,res,next){
        try{
            const user = await userServices.createUser(req.body);
            res.status(StatusCodes.CREATED).json(user);
            }catch(error){
                if (error.code === 11000) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: CONSTANTS.ALREADY_EXIST });
                } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
                }            
            }
    }

    async loginUser(req,res,next){
        try{
            const checkUserExist = await userServices.findUserByEmail(req.body);
            res.status(StatusCodes.OK).json(checkUserExist);
        }
        catch(error){
            next(new ErrorHandler(StatusCodes.UNAUTHORIZED, error.message));
        }
    }
}
export const userController = new UserController();