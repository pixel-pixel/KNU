import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { eventModel } from "../models";
import { get } from "../utils/controller";

get('/event/', authUserOnly, enableStatistic, async (req, res) => {
  const events = await eventModel.find({}, { __v: 0 })
  events.forEach(e => e.views++)
  await Promise.all(events.map(e => e.save()))
  res.json(events)
})