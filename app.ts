import dotenv from "dotenv";
import Server from './models/server';

//Configuracion dotenv
dotenv.config();

const server = new Server();

server.listen();