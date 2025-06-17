// src/middlewares/Middleware.ts

import { Request, Response, NextFunction } from "express";

/**
 * Represents an abstract class for middleware in an application.
 * Middleware is used to process incoming requests and responses
 * in a sequential manner and can either modify the request/response
 * or terminate the cycle by sending a response.
 *
 * Any class extending this abstract class must implement the `handle` method.
 */

export abstract class Middleware {
    abstract handle(req: Request, res: Response, next: NextFunction): void;
}
