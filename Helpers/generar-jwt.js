const jwt = require('jsonwebtoken');

const generarJWT =(uid='')=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};
        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY,{
            expiresIn:'4h'
        },(err,token )=>{
            if(err){
                console.log(err);
                reject('Tenemos problemas con generar el Token');
            }else{
                resolve(token);
            }
        })
    })
}

module.exports={
    generarJWT
}