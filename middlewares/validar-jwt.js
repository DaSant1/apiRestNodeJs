const{ response, request}= require('express');
const jwt = require('jsonwebtoken');

const Usuario= require('../models/usuario');

const validarJWT = async(req=request, res=response,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            message:"Token invalido o Expirado"
        });
    }

    try{
        const {uid}= jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
        const usuario= await Usuario.findBy(uid);
        if(!usuario){
            return res.status(401).json({
                message: "Token no valido o Expirado"
            })
        }

        if(!Usuario.estado){
            return res.status(401).json({
                message:"Token no valido o expirado"
            })
        }
        req.Usuario= usuario;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            msg:'Token Invalido'
        })
    }

}

module.exports={
    validarJWT
}