import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { organisationModel } from "../models";
import { get } from "../utils/controller";

get('/organisation/:id', authUserOnly, enableStatistic, async (req, res) => {
  const { id } = req.params
  const organisation = await organisationModel.findById(id, { __v: 0 })
  if (!organisation) {
    throw new HttpError(404, `Organisation with id ${id} not found`)
  }
  res.json({ organisation })
})