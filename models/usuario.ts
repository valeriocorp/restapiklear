import mongoose, { Schema, model } from 'mongoose';


interface UserAttrs  {

    firstname: string,
    lastname:  string,
    email: string,
    phone: string,
    password: string,
    role: string,

}


//An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc>{

    build(attrs: UserAttrs): UserDoc;

}

//An interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document{

    firstname: string,
    lastname:  string,
    email: string,
    phone: string,
    password: string,
    img: string,
    role: string,
    state: boolean,
    google: boolean,
 

}

const usuarioSchema = new Schema({
    firstname: {
        type: String,
        required: [true,'El nombre debe ser enviado']
    },
    lastname: {
        type: String,
        required: [true,'El nombre debe ser enviado']
    },
    email: {
        type: String,
        required: [true,'El correo debe ser enviado'],
        unique: true
    },
    phone: {
        type: String,
        required: [true,'El Numero celular debe ser enviado'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

usuarioSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject<UserDoc>();
    return user;
}

usuarioSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = model<UserDoc, UserModel>('User', usuarioSchema);

export {User};