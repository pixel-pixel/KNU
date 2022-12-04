import Joi from "joi"
import { HttpError } from "../errors/HttpError"
import { authUserOnly } from "../middlewares/adminOnly"
import { enableStatistic } from "../middlewares/enableStatistic"
import { userModel } from "../models"
import { patch } from "../utils/controller"

const updateUserSchema = Joi.object({
  sex: Joi.string().valid('M', 'F'),
  phoneNumber: Joi.string().min(10).max(13),
  location: Joi.object({
    city: Joi.string().min(1).required(),
    address: Joi.string().min(1).required()
  })
})

patch('/user/', authUserOnly, enableStatistic, async (req, res) => {
  const { user, body } = req as any
  const { error } = updateUserSchema.validate(body)
  if (error) {
    throw new HttpError(400, error)
  }

  const { sex, phoneNumber, location } = body
  user.sex = sex
  user.phoneNumber = phoneNumber
  user.location = location
  await user.save()

  const updatedUser = await userModel.findById(user._id, { _id: 0, __v: 0, hashedPassword: 0 }).lean()
  res.json({ user: updatedUser })
})