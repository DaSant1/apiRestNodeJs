const {Router}=require('express');
const {check}=require('express-validator');

const {validarCampos} = require('../middlewares/validar-campo');
const {isRoleValid, emailExiste, existeUsuarioById}= require('../Helpers/db-validators');

const {getUsuarios, createNewUsuario,updateUsuario}=require('../controllers/usuario');
const { isObjectIdOrHexString } = require('mongoose');

const router= Router();

router.get('/',getUsuarios);

router.post('/createUser',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La password ingresada debe superar los 6 caracteres').isLength({min:6}),
    check('correo').custom(emailExiste),
    check('rol').custom(isRoleValid),
    validarCampos

],createNewUsuario);


