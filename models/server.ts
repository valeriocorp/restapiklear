import  express from 'express';
import userRoutes from '../routes/usurio';
import cors from 'cors';


class Server {
    private app: express.Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios'
    }
    constructor(){
    this.app = express();
    this.port = process.env.PORT || '8081';
    this.middlewares();
    this.routes();     
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
        this.app.use(this.apiPath.usuarios, userRoutes);
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export default Server;