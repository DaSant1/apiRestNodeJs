const {response}= require('express');
const bcrypt= require('bcrypt');

const Usuario= require('../models/usuario');

const {generarJWT}=require('../Helpers/generar-jwt');
const usuario = require('../models/usuario');

const login = async (req, res=response)=>{
    const {correo, password}=req.body;

    try{
        const userData= await verificarCorreo(correo);
        await verificarAutorizacionUsuario(userData);
        await verificarConstraseña(password, userData);

        const token = await generarJWT(usuario.id);

        res.status(200).json(
            {token:token});

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'No se ha podido procesar los datos, intentelo más tarde, si el error continua, comunicate con soporte'
        })
    }
}

const verificarCorreo= async(correo)=>{
    const usuario= await Usuario.findOne({correo});
    if(!usuario){
        throw new error("Credenciales incorrectas");
    }else{
        return usuario;
    }
}

const verificarAutorizacionUsuario=async(usuario)=>{
    if(!usuario.estado){
        throw new Error('Usuario no autorizado');
    }
}

const verificarConstraseña= async(password,usuario)=>{
    
    const isCorrectPassword= await bcrypt.compareSync(password, usuario.password);
    if(!isCorrectPassword){
        throw new error('Credenciales Incorrectas');
    }
}