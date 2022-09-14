import { HttpError } from "../errors/HttpError";
import { get, post } from "../utils/controller";
import Joi from 'joi'
import userModel from "../models/userModel";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const loginUserSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
})

post('/users/login', async (req, res) => {
  const { body } = req
  const { error } = loginUserSchema.validate(body)
  if (error) {
    throw new HttpError(400, error)
  }

  const { username } = body
  const findedUser = await userModel.findOne({ username }, '-_id -__v').lean()  
  if (!findedUser) {
    throw new HttpError(404, `User with username ${username} not found`)
  }

  const isPasswordCorrect = bcrypt.compareSync(body.password, findedUser.password!)
  if (!isPasswordCorrect) {
    throw new HttpError(403, 'Incorrect password')
  }

  const secret = process.env.JWT_SECRET_KEY!
  const token = jwt.sign(findedUser, secret)

  res.json({ token })
})