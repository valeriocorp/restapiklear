import {Router} from 'express';
import { check } from 'express-validator';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controller/usuario';
import validarCampos from '../middlewares/validar-campos';
import { isRoleValid, emailExist, phoneExist, userByIDExist } from '../helpers/db-validator';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/',[
    check('firstname', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y tiene que tener mas de 6 letras').isLength({min:6}),
    check('phone', 'El Numero telefonico es obligatorio y tiene que tener mas de 9 numeros').isLength({min:10}),
    check('phone').custom( phoneExist),
    check('email', 'Email no es valido').isEmail(),
    check('email').custom( emailExist),
  //  check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( isRoleValid),
    validarCampos

], postUsuario);
router.put('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(userByIDExist),
  check('role').custom( isRoleValid),
  validarCampos
], putUsuario);
router.delete('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(userByIDExist),
  validarCampos

], deleteUsuario);



export default router;