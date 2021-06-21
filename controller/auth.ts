import  {Request, Response}   from 'express';
import { User } from '../models/usuario';
import bcryptjs from 'bcryptjs';



export const login = async (req: Request, res: Response) =>{

    const {email, password} = req.body;

    const usuario = await  User.findOne({email});
    //verificar la estado 
    if (!usuario?.state) {
        return res.status(400).json({
            msg: 'Usuario desactivado'
        });
    }
    //verificar la contraseña
    const validatePassword = bcryptjs.compareSync(password, usuario.password); 
    if (!validatePassword) {
        return res.status(400).json({
            msg: 'Email o contraseña no son correctos--- passgord'
        });
    }
    //generar el jwt
 
    try {
        res.json({
            msg: 'login'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    }
   
  
}


