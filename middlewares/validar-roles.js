const {response}= require('express');

const isAdminRole=(req,res=response, next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg:"Es necesario verificar el rol pero aun no hay token disponible "
        });
    }

    const {rol, nombre}= req.usuario;

    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:"No puede generar cambios sin ser un ADMIN"
        })
    }
    next();
}

const tieneRole=(...roles)=>{
    return (req,res=response,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg:'Es necesario verificar el rol'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json(
                {
                    msg:'Se require un rol'
                }
            );
            next();
        }
    }
}


module.exports={
    isAdminRole,
    tieneRole
}