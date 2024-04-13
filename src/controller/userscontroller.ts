import { Request, Response } from "express"
import { hashPassword } from "../services/password.services"
import prisma from '../models/user'


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        if (!email) {
            throw new Error("El email es obligatorio")
            return
        }
        if (!password) {
            throw new Error("El password es obligatorio")
            return
        }
        const hashedPassword = await hashPassword(password)
        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword
            }
        })
        res.status(201).json(user)
    } catch (error: any) {
        console.log(error)
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ message: "El email ya existe" })
        }
        console.log(error)
        res.status(500).json({ error: "Hubo un error en el registro" })
    }
}

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.findMany()
        res.status(200).json(users)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: "Hubo un error en el registro" })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userid = parseInt(req.params.id)
    try {
        const user = await prisma.findUnique({
            where: {
                id: userid
            }
        })
        if (!user) {
            res.status(404).json({ error: "El usuario no fue encontrado" })
            //el return debe estar afuera por que estamos devolviendo una promesa vacia o sea void
        }
        res.status(200).json(user)
    } catch (error: any) {
        console.log(error)
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userid = parseInt(req.params.id)
    const { email, password } = req.body
    try {
        let dataeToUpdate: any = { ...req.body }

        if (password) {
            const hashedPassword = await hashPassword(password)
            dataeToUpdate.password = hashedPassword
        }

        if (email) {
            dataeToUpdate.email = email
        }

        const user = await prisma.update({
            where: {
                id: userid
            }, data: dataeToUpdate
        })
        if (!user) {
            res.status(404).json({ error: "El usuario no fue encontrado" })
            //el return debe estar afuera por que estamos devolviendo una promesa vacia o sea void
        }
        res.status(200).json(user)
    } catch (error: any) {
        console.log(error)
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ message: "El email ya existe" })
        } else if (error?.code === 'P2025') {
            res.status(404).json({ error: "El usuario no existe" })
        } else {

            console.log(error)
            res.status(500).json({ error: "Hubo un error en la actualizacion" })
        }
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: userId
            }
        })
        res.status(200).json({ message: `El usuario ${userId} ha sido eliminado` }).end()
        //poner el .end() en el delete
    } catch (error: any) {
        console.log(error)
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ message: "El email ya existe" })
        } else if (error?.code === 'P2025') {
            res.status(404).json({ error: "El usuario no existe" })
        } else {

            console.log(error)
            res.status(500).json({ error: "Hubo un error en la actualizacion" })
        }
    }
}