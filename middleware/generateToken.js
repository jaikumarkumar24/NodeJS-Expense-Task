import jwt from 'jsonwebtoken';

import { constants } from '../constants/constants.js';

export const generateAuthToken = (data)=>{
    try {

        const { _id,username,email } = data;
        const payload = { _id,username,email };
        // Generate a JWT with your secret key
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE });
        return token;
      } catch (error) {
        console.error(constants.jwtError, error.message);
        return error.message;
      }
}