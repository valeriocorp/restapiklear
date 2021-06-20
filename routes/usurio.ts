import {Router} from 'express';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controller/usuario';

const router = Router();

router.get('/', getUsuario);
router.get('/:id', getUsuarios);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);



export default router;