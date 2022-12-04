import { HttpError } from "../errors/HttpError"
import { get, post } from "../utils/controller"
import Joi from 'joi'
import userModel from "../models/userModel"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { v4 as uuid } from "uuid"

const registerUserSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('USER').required()
})

post('/users/register', async (req, res) => {
  const { body } = req
  const { error } = registerUserSchema.validate(body)
  if (error) {
    throw new HttpError(400, error)
  }

  const { username, role } = body
  const findedUser = await userModel.findOne({ username })
  if (findedUser) {
    throw new HttpError(409, `Username ${username} already taken`)
  }

  const password = bcrypt.hashSync(body.password, 7)
  const cartId = uuid()
  const newUser = { ...body, password, cartId }
  await userModel.create(newUser)

  const dataForTokenize = { username, role, cartId }
  const secret = process.env.JWT_SECRET_KEY!
  const token = jwt.sign(dataForTokenize, secret)

  res.json({ token })
})