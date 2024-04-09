const {Router}=require('express');
const {check}=require('express-validator');

const {validarCampos} = require('../middlewares/validar-campo');
const {isRoleValid,existeRol, existeEmail, existeUsuarioById}= require('../Helpers/db-validators');

const {getUsuarios, createNewUsuario,updateUsuario}=require('../controllers/usuario');
const {createNewRol}= require('../controllers/rol');
//const { isObjectIdOrHexString } = require('mongoose');

const router= Router();

router.get('/',getUsuarios);

router.post('/createUser',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La password ingresada debe superar los 6 caracteres').isLength({min:6}),
    check('correo').custom(existeEmail),
    check('rol').custom(isRoleValid),
    validarCampos

],createNewUsuario);


router.post('/createRol',[
    check('rol').custom(existeRol),
    validarCampos
],createNewRol);



module.exports=router;