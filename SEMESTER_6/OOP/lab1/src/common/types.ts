import { Request, Response } from 'express'

export type Controller = {
  [key: string]: ResReqFunc
}

export type ResReqFunc<T = Promise<void>> = (req: Request, res: Response) => T

export type Middleware = (req: Request, res: Response, next: () => void) => | void
