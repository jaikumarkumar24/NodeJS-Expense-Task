import Joi from "joi";

const userRegisterSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
    email:Joi.string().email().required()
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
})

const getUserListSchema = Joi.object({
    email: Joi.string().email().required(),
})

export default {
    userRegisterSchema,
    userLoginSchema,
    getUserListSchema
}