import Joi from 'joi'

export const registerUserSchema = Joi.object({
  username: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('USER', 'ADMIN').required(),
})

export const loginUserSchema = Joi.object({ 
  username: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
})

