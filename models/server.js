const express = require('express');
const cors = require( 'cors');

const {dbConnection}=require('../database/config');

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.usuariosPath='/api/Usuarios';

        //conectarse con la base de datos
        this.conectarDb();

        //middlewares
        this.middlewares();

        //open routes of the application
        this.routes();
    }


    async conectarDb(){
        await dbConnection();
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
        this.app.use(this.usuariosPath,require('../routes/Usuario'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto ',this.port);
        });
    }
}

module.exports=Server;

