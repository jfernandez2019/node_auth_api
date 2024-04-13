//Este segmento es importante si usaremos prisma
//prisma es la funcion que por debaje realiza las querys de la CRUD que se estara realizando en la api
//con esto que esta debajo es suficiente
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma.user;