import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { eventModel, organisationModel } from "../models";
import { post } from "../utils/controller";
import { toMiddleware } from "../utils/toMiddleware";

const createEventSchema = toMiddleware(Joi.object({
  title: Joi.string().min(4).required(),
  description: Joi.string().min(50).required(),
  organisation: Joi.string().min(10).required(),
  hours: Joi.number().positive().required(),
  workType: Joi.string().required(),
  tasks: Joi.array().items(Joi.string()).required(),
  contactEmail: Joi.string().email().required(),
  contactPhone: Joi.string().min(10).max(13).required()
}))

post('/event/', authUserOnly, createEventSchema, enableStatistic, async (req, res) => {
  const { organisation: id } = req.body
  const organisation = await organisationModel.findById(id)
  if (!organisation) {
    throw new HttpError(404, `Organisation with id ${id} not found`)
  }

  const { _id } = (req as any).user
  if (!_id.equals(organisation.contactUser)) {
    throw new HttpError(400, `You are not the contact user of this organisation`)
  }

  const event = await eventModel.create(req.body)
  res.json({ event })
})