import Joi from "joi";
import { StatusCodes } from 'http-status-codes';

function ValidateReq(schema = Joi.object({}), reqType = "body"){
    return (req,res,next)=>{
        try{
            const validationresult = schema.validate(req[reqType], { abortEarly: false});

            if (validationresult.error) {
                return res.status(StatusCodes.BAD_REQUEST).send({message: validationresult.error.message || validationresult.error.details[0]})
            }else{
                next();
                return null;
            }
        }
        catch(error){
            return error;
        }
    }
}

export {
    ValidateReq
}