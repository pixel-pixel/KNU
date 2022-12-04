import { Request, Response, NextFunction } from "express"
import { statisticModel } from "../models/statistic.model"

export const enableStatistic = async (req: Request , res: Response, next: NextFunction) => {
  const { body, params, method, originalUrl } = req
  const { _id: userId } = (req as any).user || { _id: null }

  await statisticModel.create({
    userId,
    method,
    originalUrl,
    body,
    params,
  })

  next()
}