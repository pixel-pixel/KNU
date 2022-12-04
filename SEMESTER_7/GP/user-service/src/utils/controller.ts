import { app } from '../server'
import { Request, Response, NextFunction } from 'express'

type ControllerFunc = (req: Request, res: Response, next: NextFunction) => Promise<void>
type HttpMethod = 'get' | 'post' | 'patch'

const handler = (method: HttpMethod, path: string, ...funcs: ControllerFunc[]) => {
  const handledFuncs: ControllerFunc[] = funcs.map(f => (req, res, next) => f(req, res, next).catch(e => {
    const status = e.status || 500
    const error = e.message || 'Internal server error'

    console.log(`❌ Error (${status}): ${error}`);

    res.status(status)
      .json({ error })
  }))
  app[method](path, ...handledFuncs)
}

export const get = (path: string, ...funcs: ControllerFunc[]) => handler('get', path, ...funcs)
export const post = (path: string, ...funcs: ControllerFunc[]) => handler('post', path, ...funcs)
export const patch = (path: string, ...funcs: ControllerFunc[]) => handler('patch', path, ...funcs)


