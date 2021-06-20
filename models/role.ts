import mongoose, { Schema, model } from 'mongoose';


interface RoleAttrs  {
    role: string,

}


//An interface that describes the properties that a Role model has
interface RoleModel extends mongoose.Model<RoleDoc>{

    build(attrs: RoleAttrs): RoleDoc;

}

//An interface that describes the properties that a Role document has
interface RoleDoc extends mongoose.Document{

    role: string,
}

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true,'El rol es obligatorio']
    }
})

RoleSchema.statics.build = (attrs: RoleAttrs) => {
    return new Role(attrs);
};

const Role = model<RoleDoc, RoleModel>('Role', RoleSchema);

export {Role};