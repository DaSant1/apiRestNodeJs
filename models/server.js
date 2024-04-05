const express = require('express');
const cors = require( 'cors');

const {dbConnection}=require('../database/config');

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.usuariosPath='/api/Usuarios';
        this.rolePath='/api/Role';
        this.authPath='/api/auth';
        //conectarse con la base de datos
        this.conectarDb();

        //middlewares
        this.middlewares();

        //open routes of the application
        this.routes();
    }


    async conectarDb(){
        try{
            await dbConnection();

        }catch(error){
            console.log("Error al acceder a la base de datos");
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        
        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        try{
            this.app.use(this.usuariosPath,require('../routes/Usuario'));
            this.app.use(this.rolePath,require('../routes/Role'));
            this.app.use(this.authPath,require('../routes/auth'));
        }catch(error){
            console.log("tenemos un error en el acceso a las rutas");
            console.log("El error es  "+ error);
        }
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto ',this.port);
        });
    }
}

module.exports=Server;

