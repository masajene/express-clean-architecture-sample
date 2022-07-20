import { NextFunction, Request, Response } from 'express'

const errorMessageMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  res.status(500).send({ message: err.message })
}

export default errorMessageMiddleware
