//se utiliza una interface para asignar el modelo de datos que estaremos utilizando
//en todo el programa
//para usuario se respondera bajo los valores de id,email, password
export interface User {
    id: number;
    email: string;
    password: string;
}
