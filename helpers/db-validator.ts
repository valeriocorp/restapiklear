import  mongoose, { ObjectId } from 'mongoose';
import { Role } from '../models/role';
import { User } from '../models/usuario';

export const isRoleValid = async(role = '') =>{
    const existeRol = await Role.findOne({role});
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en base de datos`)
    }
  }

  export const emailExist = async(email = '') =>{
    const existeEmail = await User.findOne({email});
    if (existeEmail) {
        throw new Error(`El email ${email} ya esta registrado intenta iniciar session`)
    }
  }
  export const loginExist = async(email = '') =>{
    const existelogin = await User.findOne({email});
    if (!existelogin) {
        throw new Error(`Email o contraseña no son correctos`)
    }
  }

  export const phoneExist = async(phone = '') =>{
    const existePhone = await User.findOne({phone});
    if (existePhone) {
        throw new Error(`El numero de telefono ${phone} ya esta registrado intenta utilizar otro`)
    }
  }

  export const userByIDExist = async(id: any) =>{
    if (mongoose.Types.ObjectId.isValid(id)) {
      const existeUsuario = await User.findById({_id:id});
      if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
    }
  
  }