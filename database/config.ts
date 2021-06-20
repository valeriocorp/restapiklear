import mongoose from 'mongoose';


const dbConnection = async() =>{
    if (!process.env.MONGODB_CNN) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
       await mongoose.connect(process.env.MONGODB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
       });
       console.log('Bases de datos online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar mongodb');
    }
}  


export default dbConnection;