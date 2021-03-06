import  express from 'express';
import userRoutes from '../routes/usurio';
import authRoutes from '../routes/auth';

import cors from 'cors';
import dbConnection from '../database/config';


class Server {
    private app: express.Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios',
        authpath: '/api/auth'
    }
    constructor(){
    this.app = express();
    this.port = process.env.PORT || '8081';
    this.conectarDB();
    this.middlewares();
    this.routes();     
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        //cors
        this.app.use(cors());
        //bodyparser
        this.app.use(express.json());
        //carpeta publica 
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPath.authpath, authRoutes);

        this.app.use(this.apiPath.usuarios, userRoutes);

    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export default Server;