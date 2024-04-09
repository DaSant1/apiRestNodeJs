const {Router}=require('express');
const {check}=require('express-validator');
const {validarCampos}=require('../middlewares/validar-campo');
const {isRoleValid,existeRol}= require('../Helpers/db-validators');
const {createNewRol,getRols}= require('../controllers/rol');
const {validarJWT }=require('../middlewares')
const router= Router();
router.post('/createRol',[
    validarJWT,
    check('rol').custom(existeRol),
    validarCampos,
    validarJWT
],createNewRol);


router.get('/getRoles',getRols);


module.exports=router;
