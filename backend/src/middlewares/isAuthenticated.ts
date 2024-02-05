import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface Payload{
    sub: string
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    // receber o Token
    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")

    //console.log('Token',token)

    try {
        // id do usuario
        const { sub } = verify(
            token, 
            process.env.JWT_SECRET || 'default_secret'
            ) as Payload

            // precisa criar em @types/Express a variável user_id para injetar dentro do req
            req.user_id = sub

            return next()

    } catch (error) {
        return res.status(401).end()
    }


}