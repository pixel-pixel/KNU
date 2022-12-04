import { HttpError } from "../errors/HttpError"
import { adminOnly } from "../middlewares/adminOnly"
import userModel from "../models/userModel"
import { get } from "../utils/controller"

get('/users/:username', async (req, res) => {
  const { username } = req.params
  if (!username) {
    throw new HttpError(400, 'Bad username')
  }

  const findedUser = await userModel.findOne({ username }, '-_id -__v').lean()
  if (!findedUser) {
    throw new HttpError(404, `User with username ${username} not found`)
  } 
  
  res.json(findedUser)
})