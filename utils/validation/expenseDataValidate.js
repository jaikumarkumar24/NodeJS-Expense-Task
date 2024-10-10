import Joi from "joi";
import mongoose from 'mongoose';
import { CONSTANTS } from "../../config/constants.js";

const expensesCreateSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    amount:Joi.number().positive().max(99999999999999).required(),
    category:Joi.string().min(3).max(30).required(),
    date:Joi.date().optional()
});

const objectIdValidation = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message(CONSTANTS.OBJECT_ID_ERROR);
    }
    return value;
  };

const expenseParamSchema = Joi.object({
    id: Joi.string().custom(objectIdValidation, CONSTANTS.OBJECT_VALIDATION).required(),
});

const expensesUpdateSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    amount:Joi.number().positive().max(99999999999999).required(),
    category:Joi.string().min(3).max(30).required(),    
})

export default {
    expensesCreateSchema,
    expensesUpdateSchema,
    expenseParamSchema
}