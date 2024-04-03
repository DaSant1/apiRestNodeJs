const Usuario= require('../models/usuario');
const Role=require('../models/role');

const isRoleValid= async(rol='')=>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error('El error ingresado no es valido, es necesario intentar con otro');

    }
}

const existeRol=async(rol='')=>{
    try{
        const rolExiste= await Role.findOne({rol});
        if(rolExiste){
            throw new Error("El rol ya existe en el sistema");
        }
    }catch(error){
            console.log("Error al buscar los roles disponibles");
    }
    
}

/**
 * 
 */
const existeEmail=async(correo='')=>{
    //se verifica si el email ingresado ya existe en los registros
    try{
        const emailExiste = await Usuario.findOne({ correo });
        if(emailExiste){
            throw new Error("El correo ingresado ya existe");
        }
    }catch(error){
        throw new Error("Error en el acceso a los datos");
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
    isRoleValid,
    existeRol
}