import { HttpError } from "../errors/HttpError"
import { adminOnly } from "../middlewares/adminOnly"
import userModel from "../models/userModel"
import { get } from "../utils/controller"

get('/users', adminOnly, async (req, res) => {
  const findedUsers = await userModel.find({}, '-_id -__v').lean() 
  res.json(findedUsers)
})