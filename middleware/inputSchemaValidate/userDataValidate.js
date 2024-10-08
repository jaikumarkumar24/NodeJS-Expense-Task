import Joi from "joi";

const userRegisterSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
    email:Joi.string().email().required()
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
})

export {
    userRegisterSchema,
    userLoginSchema
}