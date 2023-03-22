import {NextFunction, Request, Response} from 'express';
import CustomError from "./classes/CustomError";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
    next(error);
};

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}

export {notFound, errorHandler};
