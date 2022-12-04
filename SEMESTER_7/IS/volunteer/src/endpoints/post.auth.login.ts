import { HttpError } from "../errors/HttpError";
import { get, post } from "../utils/controller";
import Joi from 'joi'
import { userModel } from "../models";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { enableStatistic } from "../middlewares/enableStatistic";

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

post('/auth/login', enableStatistic, async (req, res) => {
  const { body } = req
  const { error } = loginUserSchema.validate(body)
  if (error) {
    throw new HttpError(400, error)
  }

  const { email, password } = body
  const user = await userModel.findOne({ email }, { _id: 0, __v: 0 })  
  if (!user) {
    throw new HttpError(404, `User with email ${email} not found`)
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.hashedPassword!)
  if (!isPasswordCorrect) {
    throw new HttpError(403, 'Incorrect password')
  }

  const secret = process.env.JWT_SECRET_KEY!
  const { firstName, lastName } = user
  const dataForTokenize = { email, firstName, lastName }
  const token = jwt.sign(dataForTokenize, secret)

  delete user.hashedPassword
  res.json({ token, user })
})