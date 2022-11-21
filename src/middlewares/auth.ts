import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type TokenPayload = {
    id: string
    iat: number
    exp: number
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({ error: 'Token not provided!' })
    }

    const [, token] = authorization.split(' ')

    try {
        const decoded = jwt.verify(token, 'secret')

        const { id } = decoded as TokenPayload

        if(!decoded){
            return res.status(422).json({ error: 'Token invalid!' })
        }

        req.userId = id

        next()

    } catch (error) {
        return res.status(401).json({ error: 'Token invalid!' })
    }

}