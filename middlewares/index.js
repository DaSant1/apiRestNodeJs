const validarCampos= require('../middlewares/validar-campo');
const validarRoles= require('../middlewares/validar-roles');
const validar_JWT=require('../middlewares/validar-jwt');

module.exports={
    ...validarCampos,
    ...validarRoles,
    ...validar_JWT 
}