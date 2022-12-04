import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { eventModel } from "../models";
import { statisticModel } from "../models/statistic.model";
import { del } from "../utils/controller";

del('/unsubscribe/:eventId', authUserOnly, enableStatistic, async (req, res) => {
  const { eventId } = req.params
  const event = await eventModel.findById(eventId)
  if (!event) {
    throw new HttpError(404, `Event eith id ${eventId} not found`)
  }

  const { _id: userId } = (req as any).user 
  const sub = event.subscribers.find(s => userId.equals(s.user))
  if (!sub) {
    throw new HttpError(400, `User with id ${userId} don't have subscription in event with id ${eventId}`)
  }

  sub.hours = 0
  await event.save()

  res.json({ event })
})