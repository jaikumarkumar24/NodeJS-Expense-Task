'use strict';

import { findUserByEmail } from '../../db/services/user.services.js'

const userRegister = async(req,res)=>{
    console.log(req.body);
    return res.send({data:req.body}) 
}

const loginUser = async(req,res)=>{

}

const getUserData = async(req,res)=>{
    const query = {email:"jaikumar.kumar@aspiresys.com"};
    console.log('query',query);
    const response = await findUserByEmail(query);
    return res.status(200).send({"data":response});
}

export {userRegister,loginUser,getUserData}