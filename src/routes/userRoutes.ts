import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { createUser, getAllUser, getUserById, updateUser, deleteUser } from '../controller/userscontroller';

const router = express.Router()
const JWTSECRET = process.env.JWTSECRET || "default-secret"

//se prepara el middleware de JWT para hacer funcionar la api de autenticacion
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: "No autorizado" })
    }

    jwt.verify(token, JWTSECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "El token ha caducado" });
            } else {
                console.error('Error en la autenticacion: ', err);
                return res.status(403).json({ error: "Token no válido" });
            }
        }
        next();
    });
}
//ya en el archivo de userscontroller se manejan las callbacks por lo tanto aqui se pone
//directamente el nombre de la funcion que fue exportada en userscontroller
router.post('/', authenticateToken, createUser) //Agregar un nuevo recurso
router.get('/', authenticateToken, getAllUser) //Obtener todos
router.get('/:id', authenticateToken, getUserById) //Obtener el dato ingresado por parametro
router.put('/:id', authenticateToken, updateUser) //Para editarlo
router.delete('/:id', authenticateToken, deleteUser) //Para borrarlo

export default router