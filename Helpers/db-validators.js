const Usuario= require('../models/usuario');
const Role=require('../models/role');

const isRoleValid= async(rol='')=>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error('El error ingresado no es valido, es necesario intentar con otro');

    }
}


/**
 * 
 */
const existeEmail=async(correo='')=>{
    //se verifica si el email ingresado ya existe en los registros
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error("El correo ingresado ya existe");
    }
}

const existeUsuarioById=async(id)=>{
    const ExisteUsuario= await Usuario.findOne(id);
    if(!ExisteUsuario){
        throw new Error("El id Ingresado no existe");
    }
}

module.exports={
    existeEmail,
    existeUsuarioById,
    isRoleValid
}