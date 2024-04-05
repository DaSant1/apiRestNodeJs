const {response}= require('express');
const bcrypt= require('bcrypt');

const Usuario= require('../models/usuario');

const {generarJWT}=require('../Helpers/generar-jwt');
const usuario = require('../models/usuario');

const login = async (req, res=response)=>{
    const {correo, password}=req.body;
    
    try{
        const usuario= await Usuario.findOne({correo});
        if(!usuario){
            return res.status(401).json({
                msg:'Credenciales Incorrectas'
            });
        }

        //verificar si el usuairo está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'No tiene Acceso al sistema'
            });
        }

        //verificar contraseña
        const validaPassword= bcrypt.compareSync(password,usuario.password);
        if(!validaPassword){
            return res.status(400).json(
                { msg:"Credenciales incorrectas"}
            );
        }

        //Generar Token

        const token= await generarJWT(usuario.id);
        res.json({
            usuario,token
        })

        

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'No se ha podido procesar los datos, intentelo más tarde, si el error continua, comunicate con soporte'
        })
    }
}



module.exports={
    login
}   