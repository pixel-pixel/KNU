import { enableStatistic } from "../middlewares/enableStatistic";
import { tagModel } from "../models";
import { get } from "../utils/controller";

get('/tag/', enableStatistic, async (req, res) => {
  const tags = await tagModel.find({})
  res.json(tags)
})