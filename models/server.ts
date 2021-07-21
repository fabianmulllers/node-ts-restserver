import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuario.route';
import db from '../db/connection';


class Server{

    private app: Application;
    private port: string;
    private apiPaths ={
        usuario: '/api/usuarios'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        // metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection() {

        try {
             await db.authenticate();
             console.log( 'Database online' );

        } catch (error) {
            throw new Error( error );
        }

    }

    middlewares(){
        // CORS
            this.app.use( cors() )

        // Lectura del Body
            this.app.use( express.json() );

        // Carpeta publica
            this.app.use( express.static('public'))
    }

    routes(){
        this.app.use( this.apiPaths.usuario, userRoutes )
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto :', this.port );
        })
    }

}


export default Server;
