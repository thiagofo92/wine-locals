import { HTTP_STATUS } from '@/shared/util/http-status'
import { type NextFunction, type Request, type Response } from 'express'
import Jwt from 'jsonwebtoken'

export function validate (req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['x-access-token'] as string

  if (!token) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json('Failed to authentication the token')
    return
  }

  Jwt.verify(token, process.env.TOKEN || '', function (err, decoded) {
    if (err) return res.status(HTTP_STATUS.UNAUTHORIZED).json('Error to validade token')
    next()
  })
}
