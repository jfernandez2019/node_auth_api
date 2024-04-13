import {myusers} from "../models/user.interface"
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWTSECRET || "default_secret"

export const generateToken = (user:myusers): string =>{
    return jwt.sign({id:user.id, email:user.email},JWT_SECRET,{expiresIn: "1h"})
}

