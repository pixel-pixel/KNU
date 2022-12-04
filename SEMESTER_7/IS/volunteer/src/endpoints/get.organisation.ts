import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { organisationModel } from "../models";
import { get } from "../utils/controller";

get('/organisation', authUserOnly, enableStatistic, async (req, res) => {
  const organisations = await organisationModel.find({}, { __v: 0 })
  res.json(organisations)
})