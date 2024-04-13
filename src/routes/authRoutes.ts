import express from 'express';
import { register,login } from '../controller/authcontroller';
//usamos la funcion rutas que corresponde a una funcion de la libreria express
const router = express.Router()
//la funcion post depende de dos parametros, la ruta y la callback
router.post('/register', register)
router.post('/login',login)

export default router