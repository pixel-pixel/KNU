import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { tagModel } from "../models";
import { post } from "../utils/controller";
import { toMiddleware } from "../utils/toMiddleware";

const createTagSchema = toMiddleware(Joi.object({
  name: Joi.string().min(1).required()
}))

post('/tag/', authUserOnly, createTagSchema, enableStatistic, async (req, res) => {
  const { name } = req.body

  const tagByName = await tagModel.findOne({ name })
  if (tagByName) {
    throw new HttpError(400, `Tag with name ${name} already exist`)
  }

  const tag = await tagModel.create({ name })
  res.json({ tag })
})