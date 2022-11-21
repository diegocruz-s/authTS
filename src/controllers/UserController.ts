import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hashSync } from 'bcryptjs'

class UserController {

    async index(req: Request, res: Response){
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })

        if(!users){
            return res.status(422).json({ error: 'Users not found!' })
        }

        return res.status(200).json({ users })
    }

    async store(req: Request, res: Response){

        const { name, email, password } = req.body

        let user = await prisma.user.findUnique({ where: { email } })

        if(user){
            return res.status(422).json({ error: 'User already exists!' })
        }

        const hash_password = hashSync(password) 

        user = await prisma.user.create({ 
            data: {
                name, email, password: hash_password
            },
        })

        return res.status(201).json({ user })

    } 
}

export default new UserController()