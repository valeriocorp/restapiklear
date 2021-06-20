import  {Request, Response}   from 'express';
import { User } from '../models/usuario';
import bcryptjs from 'bcryptjs';

export const getUsuarios =async (req: Request, res: Response) =>{
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};
    const [total,usuarios] = await Promise.all([
        await User.countDocuments(query),
        await User.find(query)
    .skip(Number(from))
    .limit(Number(limit))
    ]);
    res.json({
        total,
        usuarios
    });
}

export const getUsuario = (req: Request, res: Response) =>{
    const {id} = req.params;
    res.json({
        msg: 'Get usuarios'
    });
}

export const postUsuario = async (req: Request, res: Response) =>{

 
    const {
        firstname,
        lastname,
        email,
        phone,
        password,
        role} = req.body;
    const user = User.build({
        firstname,
        lastname,
        email,
        phone,
        password,
        role,
    });

    //Encryptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password,salt);
    //enviar correo al usuario de bienvenida y al admin de informacion

    //guardar en db
   await user.save();
    res.json({
        user
    });
}

export const putUsuario = async (req: Request, res: Response) =>{
    const {_id,password, google,email, ...rest} = req.body;
    const {id} = req.params;
    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password,salt);
    }
    const user = await User.findByIdAndUpdate(id,rest);
    res.json({
        user
    });
}
export const deleteUsuario = async (req: Request, res: Response) =>{
    const {id} = req.params;
    //borrarlo fisicamente
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {state:false});
    res.json({
       user
    });
}