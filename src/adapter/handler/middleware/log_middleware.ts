import { NextFunction, Request, Response } from "express";

const logMiddleware = (err: Error, _req: Request, _res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    next(err)
}

export default logMiddleware;