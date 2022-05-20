import { Middleware } from "../common/types";
import { parseJWT } from "../common/utils";

export const authorized = (validRole?: string): Middleware => 
  (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) throw 'Where autorization token?'

      const { role } = parseJWT(token)
      if (validRole && validRole !== role) throw `User role must be ${validRole}`

      next()
    } catch (e: any) {
      res.status(403)
      res.json({ error: e.message ?? e })
    }
  }