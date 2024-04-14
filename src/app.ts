import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import authRoutes from './routes/authRoutes'
import usersRoutes from './routes/userRoutes'

const app = express()
app.use(express.json())

// Middleware para permitir solicitudes CORS desde cualquier origen
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Configura para permitir solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Configura los métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Configura los encabezados permitidos
    next();
});

//Routes
app.use('/auth', authRoutes)
//autenticacion
app.use('/users', usersRoutes)
//user


export default app


