import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { eventModel } from "../models";
import { get } from "../utils/controller";

get('/event/:id', authUserOnly, enableStatistic, async (req, res) => {
  const { id } = req.params
  const event = await eventModel.findById(id)
  if (!event) {
    throw new HttpError(404, `Event not found`)
  }

  event.views++
  await event.save()

  res.json({ event })
})