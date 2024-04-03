const {response, request}=require('express');
const brcrypt=require('bcrypt');

const UsuarioModel= require('../models/usuario');


const getUsuarios= async(req=request, res=response)=>{
    const {limite =5, desde=0}=req.query;
    const query={estado:true};
    const [total,usuarios]= await Promise.all([
        UsuarioModel.countDocuments(query),
        UsuarioModel.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, usuarios
    });
}

/**
 * Descripcion:
 *      Crea un usuario a partir de un conjunto de parametros
 * Entrada:
 *      req es un objeto el cual contiene parametro de sesion
 * Salida:
 *      Devuelve el usuario
 */

const createNewUsuario= async(req,res=response)=>{
        const {nombre, correo, password, rol}=req.body;
        const usuarioModel= new UsuarioModel({nombre,correo,password,rol});


        //encripta la contraseña
        const salt= brcrypt.genSaltSync();
        usuarioModel.password= brcrypt.hashSync(password,salt);
        await usuarioModel.save();

        res.json({
            usuarioModel
        })
}

/**
 * Descripcion;
 *      actualizar los datos de usuarios por el id
 * Entrada:
 *      req objeto con los parametros ingresados por el usuario
 * Salida:
 *      devuelve el usuario 
 */

const updateUsuario= async(req,res=response)=>{
    const {id}=req.params;
    const{_id, password, google, correo,...resto}=req.body;
    if(password){
        const salt= brcrypt.genSaltSync();
        resto.password=brcrypt.hashSync(password,salt);
    }
    const usuarioModel=UsuarioModel.findByIdAndUpdate(id,resto);
    res.json(usuarioModel);
}


module.exports={
    updateUsuario,
    createNewUsuario,
    getUsuarios
}