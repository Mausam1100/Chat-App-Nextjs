import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface AuthPayload {
  userId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return res.status(400).json({
                msg: "Authorization header missing!"
            })
        }

        const token = authHeader?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
            message: "Token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.BACKEND_JWT_SECRET!) as AuthPayload

        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(`Error in authMiddlware: ${error}`)
    }
}