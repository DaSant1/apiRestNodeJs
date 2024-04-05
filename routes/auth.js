const {Router}= require('express');
const {check, checkExact}= require('express-validator');

const {validarCampos} = require ('../middlewares/validar-campo');
const {login}= require('../controllers/auth');
const router=Router();

router.post('/LogIn',[
    check('correo','El correo es necesario').isEmail(),
    check('password','Es necesaria la contraseña').not().isEmpty(),
    validarCampos
],login);

module.exports=router;