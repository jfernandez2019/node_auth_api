Notas de instalacion
Para iniciar typescript
--------------------------------------
se utiliza node package executor (npx)

- npx tsc --init  --outDir dis/ --rootDir scr **se pone init para iniciar un poryecto typescript dentro de node  **ouDir nos dice donde se guardara la compilacion de nuestro proyecto **rootDir nos dice donde estaremos trabajando con typescript

Parecido a nodemon
---------------------------------
"scripts": {
    "dev": "tsnd --respawn --clear src/app.ts"
	
Para iniciar prisma 
-----------------------------
npx prisma init

Eso hace que en las variables de entorno .env se genere un enlace en el que hay que colocar la informacion real de usuario y password para poder levantalo

Se debe armar la estructura es decir el model de prisma y 
Luego se hace : npx prisma generate 

Ejemplo de modelo prisma 

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}

este model se escribe en el archivo de prisma

recordemos que prisma permite al programa por debajo escribir las consultas sql para la base de datos 

npx prisma migrate dev : Sirve para generar la base de datos de prueba "mydeb" o como se llame
