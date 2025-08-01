// src/middlewares/Middleware.ts

import { Request, Response, NextFunction } from "express";

/**
 * Abstract class representing a Middleware that processes incoming HTTP requests.
 * Middleware are functions that have access to the request object (`req`), the response object (`res`),
 * and the `next` middleware function in the application’s request-response cycle.
 *
 * Classes extending this abstract class must implement the `handle` method to define specific middleware logic.
 */

export abstract class Middleware {
    abstract handle(req: Request, res: Response, next: NextFunction): void;


}
