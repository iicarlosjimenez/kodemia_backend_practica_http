# Práctica de HTTP con NodeJS
Ésta es una pequeña práctica para entender el funcionamiento de node:http ejecutando un servidor web. 
Actualmente, solo se puede:
- Consultar Books a la ruta [http://localhost:8080/books](http://localhost:8080/books), mediante el método GET
- Agregar un Book a la ruta [http://localhost:8080/books](http://localhost:8080/books), mediante el método POST
- Consultar Authors a la ruta [http://localhost:8080/authors](http://localhost:8080/authors), mediante el método GET
- Agregar un Author a la ruta [http://localhost:8080/authors](http://localhost:8080/authors), mediante el método POST


## Ejectura aplicación
Para ejecutar el servidor, es necesario ejecutar el comando
`npm run start`

## Futuras actualizaciones
- Se pretende aplicar una pequeña base de datos con un archivo JSON
- Faltan los métodos PUT y DELETE para las rutas de books y authors
