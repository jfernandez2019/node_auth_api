import { Request, Response } from "express"
import { comparePassword, hashPassword } from "../services/password.services"
import prisma from '../models/myuser'
import { generateToken } from "../services/aut.service"


export const register = async (req: Request, resp: Response): Promise<void> => {
    const { email, password } = req.body
    try {
        if (!email) {
            throw new Error("El email es obligatorio")
            return
        }
        if (!password) {
            throw new Error("El password es obligatorio")
            return
        }
        const hashedPassword = await hashPassword(password)

        //este user es una instancia de prisma que estara realizando los querys sql 
        //en un archivo para que se vaya ejecutando
        const createUser = await prisma.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        const token = generateToken(createUser)
        resp.status(201).json({ token })
    } catch (error: any) {
        console.log(error)
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            resp.status(400).json({ message: "El email ya existe" })
        }
        console.log(error)
        resp.status(500).json({ error: "Hubo un error en el registro" })
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
        if (!email) {
            throw new Error("El email es obligatorio")
            return
        }
        if (!password) {
            throw new Error("El password es obligatorio")
            return
        }

        const user = await prisma.findUnique({ where: { email } })
        if (!user) {
            res.status(404).json({ error: "Usuario o password no encontrado" })
            return
        }

        const passwordmatch = await comparePassword(password, user.password);  //comparador de contrasenhas
        if (!passwordmatch) {
            res.status(401).json({ message: "Usuario o password no coincide" })
        }

        const token = generateToken(user)
        res.status(200).json({ token })
    } catch (error) {
        console.log("Error :", error)
    }
}

