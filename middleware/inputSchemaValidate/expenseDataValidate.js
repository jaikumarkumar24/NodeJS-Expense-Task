import Joi from "joi";
import mongoose from 'mongoose';

import { constants } from "../../constants/constants.js";

const expensesCreateSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    amount:Joi.number().positive().max(99999999999999).required(),
    category:Joi.string().min(3).max(30).required(),
    date:Joi.date().optional()
});

const objectIdValidation = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message(constants.objectIdValidation);
    }
    return value;
  };

const expenseParamSchema = Joi.object({
    id: Joi.string().custom(objectIdValidation, 'ObjectId validation').required(),
});

const expensesUpdateSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    amount:Joi.number().positive().max(99999999999999).required(),
    category:Joi.string().min(3).max(30).required(),    
})

export {
    expensesCreateSchema,
    expensesUpdateSchema,
    expenseParamSchema
}