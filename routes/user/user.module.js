'use strict';
import { generateAuthToken } from '../../middleware/generateToken.js';
import { findUserByEmail,createUser } from '../../db/services/user.services.js'

import { ErrorHandler } from '../../middleware/errorHandler.js'
import { StatusCodes } from 'http-status-codes';


const userRegister = async(req,res)=>{

    const params = {"email":req.body.email}
    const uniqueValidation = await findUserByEmail(params);
    console.log(uniqueValidation);
    if(uniqueValidation.length){
        return res.status(StatusCodes.CONFLICT).send({data:"User Already Exist"})
    }
    else{        
        const data = []
        const response = await createUser(req.body);
        const { username,email,_id } = response;
        data.push({ _id,username,email })
        return res.status(StatusCodes.CREATED).send({data})
    }
}

const loginUser = async(req,res)=>{
    try{
        const user = {"email":req.body.email}
        const checkUserExist = await findUserByEmail(user);
        if(checkUserExist[0] && checkUserExist[0].username && checkUserExist[0].email){
            if(req.body.password === checkUserExist[0].password){
                const newToken =  generateAuthToken(checkUserExist[0])
                return res.status(200).send({token:newToken})
            }
            else{
                res.status(StatusCodes.NOT_FOUND).send({"error":'Password is Incorrect'});
            }
        }        
        else{
            res.status(StatusCodes.NOT_FOUND).send({"error":'Email is Incorrect'});
        }
    }
    catch(error){
        next(new ErrorHandler(StatusCodes.NOT_FOUND, error.message));
    }
}

const getUserData = async(req,res,next)=>{
    try{
        const query = {"email":req.query.email};
        const response = await findUserByEmail(query);

        if (!response.length) {
            return res.status(StatusCodes.NOT_FOUND).send({"error":'User not found'});
        }
        let userValues = []
        response.forEach(({_id,username,email})=>{
            userValues.push({_id,username,email})
        })
        return res.status(StatusCodes.OK).send(userValues);
    }catch(error){
        next(new ErrorHandler(StatusCodes.BAD_REQUEST, error.message));
    }
}

export {userRegister,loginUser,getUserData}