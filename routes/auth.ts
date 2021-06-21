import {Router} from 'express';
import { check } from 'express-validator';
import { login } from '../controller/auth';
import { emailExist, loginExist } from '../helpers/db-validator';
import validarCampos from '../middlewares/validar-campos';

const router = Router();

router.post('/login',[
    check('email', 'Email no es valido').isEmail(),
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email').custom( loginExist),
    validarCampos
], login);


export default router;

