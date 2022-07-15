import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMessageMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send({ message: err.message })
}

export default errorMessageMiddleware;