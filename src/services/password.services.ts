import bcrypt from 'bcrypt';

//Hay que colocar la cantidad de vuelta que necesitara el hash

const SALT_ROUNDS: number = 10

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (password:string,hash:string):Promise<boolean> =>{
    return await bcrypt.compare(password,hash)
}

//Leer y comparar con el hash de la base de datos