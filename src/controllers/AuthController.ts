import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compareSync } from 'bcryptjs'
import jwt from "jsonwebtoken";

class AuthController {

    async login(req: Request, res: Response){

        const { email, password } = req.body

        if(!email || !password){
            return res.status(422).json({ error: 'Authentication invalid!' })
        }

        let user = await prisma.user.findUnique({ 
            where: { email }
        })

        if(!user){
            return res.status(404).json({ error: 'User not exists!' })
        }

        const isValidPassword = compareSync(password, user.password) 

        if(!isValidPassword){
            return res.status(422).json({ error: 'Authentication invalid!!' })
        }

        const token = jwt.sign({
            id: user.id,
        }, 'secret', {
            expiresIn: '1d'
        })

        const { id, name } = user

        return res.status(201).json({ user: { id, name, email, }, token })

    } 
}

export default new AuthController()