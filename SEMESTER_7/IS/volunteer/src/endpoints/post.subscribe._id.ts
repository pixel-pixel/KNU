import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { eventModel } from "../models";
import { post } from "../utils/controller";
import { toMiddleware } from "../utils/toMiddleware";

const subscribeEventSchema = toMiddleware(Joi.object({
  hours: Joi.number().positive().required()
}))

post('/subscribe/:eventId', authUserOnly, subscribeEventSchema, enableStatistic, async (req, res) => {
  const { eventId } = req.params
  const event = await eventModel.findById(eventId, { __v: 0 })
  if (!event) {
    throw new HttpError(404, `Event with id ${eventId} not found`)
  }

  const { _id: user } = (req as any).user
  const { hours } = req.body
  event.subscribers.push({ user, hours })
  await event.save()

  res.json({ event })
})