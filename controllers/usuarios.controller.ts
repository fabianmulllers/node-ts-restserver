import { Request, Response } from "express";
import { any } from "sequelize/types/lib/operators";
import Usuario from '../models/usuario';
import { Op } from 'sequelize';


export const getUsuarios =  async( req: Request, res : Response) => {

    const usuarios = await Usuario.findAll({
        where:{
            estado: 1
        }
    });

    res.json({usuarios})
}

export const getUsuario =  async( req: Request, res : Response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if(usuario){
        res.json( usuario )
    }else{
        res.status(404).json({
            msg:`No se encontro usuario con el id: ${ id }`
        })
    }

}

export const postUsuario =  async( req: Request, res : Response) => {


    try {

        const { body } = req;

        const existeEmail = await  Usuario.findOne( {
            where:{
                email : body.email
            }
        });

        if( existeEmail ){
            return res.status(400).json({
                msg : `Ya existe un usuario con el email:${ body.email }`
            })
        }

        // const usuario = Usuario.build( body )
        // await usuario.save();

        const usuario = await Usuario.create(body)

        res.json(usuario);

    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg:"Favor comunicarse con el administrador"
        })
    }

}

export const putUsuario =  async ( req: Request, res : Response) => {

    try {

        const { id } = req.params;
        const { body } = req;


        const usuario = await Usuario.findByPk( id );

        if( !usuario ){

            return res.status(400).json({
                msg:`El usuario con el id : ${id} no existe`
            })
        }

        if( body.email ){
            const existeEmail = await  Usuario.findOne( {
                where:{
                    email : body.email,
                    [Op.not]: [{id}],
                }
            });

            if( existeEmail ){
                return res.status(400).json({
                    msg : `Ya existe un usuario con el email:${ body.email }`
                })
            }
        }


        // const usuario = Usuario.build( body )
        // await usuario.save();

        await usuario.update(body,{ where:{ id } } );

        res.json(usuario);

    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg:"Favor comunicarse con el administrador"
        })
    }

}

export const deletUsuario =  async( req: Request, res : Response) => {

    try {

        const { id } = req.params;

        const usuario = await Usuario.findByPk( id );

        if( !usuario ){

            return res.status(400).json({
                msg:`El usuario con el id : ${id} no existe`
            })
        }

        // eliminacion fisica
        // await usuario.destroy();

        // eliminacion logica
        await usuario.update({ estado: 0 })

        res.json(usuario);

    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg:"Favor comunicarse con el administrador"
        })

    }



}