'use strict';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from '../config/constants.js';

const authenticateToken = (req,res,next)=>{
    if((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))){
        return res.status(StatusCodes.UNAUTHORIZED).send({
            error: CONSTANTS.INVALID_TOKEN
          })
    }

    let token;
    if((req.headers.authorization || req.headers.authorization.startsWith('Bearer '))){
        const parts = req.headers['authorization'].split(' ');
        token = parts[1];
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}

export { authenticateToken };