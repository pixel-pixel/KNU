import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { post } from "../utils/controller";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel";

const decodeTokenSchema = Joi.object({
  token: Joi.string().min(4).required()
})

post('/users/decode', async (req, res) => {
  const { body } = req
  const { error } = decodeTokenSchema.validate(body)
  if (error) {
    throw new HttpError(400, error)
  }

  const secret = process.env.JWT_SECRET_KEY!
  const { token } = body
  const { username } = jwt.verify(token, secret) as { username: string }
  const findedUser = await userModel.findOne({ username }, '-_id role username cartId').lean()
  if (!findedUser) {
    throw new HttpError(403, `'User with username ${username} not found`)
  }

  res.json(findedUser)
})