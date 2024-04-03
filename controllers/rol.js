const rolModel=require('../models/role');
const {response,request}=require('express');



const createNewRol= async(req, res=response)=>{
    const {rol}=req.body;
    try{
        const RolModel= new rolModel({rol});
        await RolModel.save();
        res.json({
            rol
        });
    }catch(error){
        console.log("Tenemos problemas con crear un nuevo rol ");
        console.log("error ", error);
        res.status(500).json({
            message:"Error en el acceso a los datos"
        })
    }
    
}

const getRols=async(req,res=response)=>{
    try{
        const availableRoles= await rolModel.find();
        res.json(availableRoles);
    }catch(err){
        res.status(500).json({
            message:"Error al Acceder a los datos"
        })
    }
}

module.exports={
    createNewRol,
    getRols
}