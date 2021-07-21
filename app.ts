import dotenv from 'dotenv'
import Server from './models/server';

// configurar doenv
dotenv.config();


const server = new Server();

server.listen();