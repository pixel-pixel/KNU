import Joi from 'joi'

export const createCardSchema = Joi.object({
  number: Joi.string().length(16).required(),
  date: Joi.string().length(5).required(),
  cv: Joi.string().length(3).required(),

  bank: Joi.string().required(),
  image: Joi.string().uri().default('https://d1opu7v3g3cdvy.cloudfront.net/us/600x450/5aad763e21cdf.webp')
})

export const blockUnblockCardSchema = Joi.object({
  number: Joi.string().length(16).required(),
  date: Joi.string().length(5).required(),
  cv: Joi.string().length(3).required(),
})