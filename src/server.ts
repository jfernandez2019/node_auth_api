import app from "./app";
//Esto es bastante importante pues se esta buscando el puerto en la declaracion de la variable de
//entorno y la asignamos a PORT, mediante la ruta process.env.PORT
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running in PORT: ${PORT}`)
})

