'use strict';
import jwt from 'jsonwebtoken';

const authenticateToken = (req,res,next)=>{
    if((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))){
        return res.status(401).send({
            error: 'Unauthorized'
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
            console.error('Token verification failed:', error.message);
            res.status(400).send(error.message)
    }
}

export default authenticateToken;