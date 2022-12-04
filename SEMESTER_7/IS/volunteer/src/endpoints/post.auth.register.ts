import { HttpError } from "../errors/HttpError"
import { get, post } from "../utils/controller"
import Joi from 'joi'
import { userModel } from "../models"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { enableStatistic } from "../middlewares/enableStatistic"

const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  age: Joi.number().min(1).required(),
})

post('/auth/register', enableStatistic, async (req, res) => {
  const { body } = req
  const { error } = registerUserSchema.validate(body)
  if (error) {
    throw new HttpError(400, error)
  }

  const { email } = body
  const findedUser = await userModel.findOne({ email })
  if (findedUser) {
    throw new HttpError(409, `email ${email} already taken`)
  }

  const { password, firstName, lastName, age } = body
  const hashedPassword = bcrypt.hashSync(password, 7)
  await userModel.create({
    email,
    hashedPassword,
    firstName,
    lastName,
    age
  })

  const dataForTokenize = { email, firstName, lastName }
  const secret = process.env.JWT_SECRET_KEY!
  const token = jwt.sign(dataForTokenize, secret)

  res.json({ token })
})