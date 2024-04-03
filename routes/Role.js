const {Router}=require('express');
const {check}=require('express-validator');
const {validarCampos}=require('../middlewares/validar-campo');
const {isRoleValid,existeRol}= require('../Helpers/db-validators');
const {createNewRol,getRols}= require('../controllers/rol');

const router= Router();
router.post('/createRol',[
    check('rol').custom(existeRol),
    validarCampos
],createNewRol);


router.get('/getRoles',getRols);


module.exports=router;
