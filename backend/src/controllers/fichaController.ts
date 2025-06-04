import { Request, Response } from 'express';
import {
    obtenerFichasFirmadas,
    actualizarFirma
} from './../services/fichaService';

export const getFichas = async (req: Request, res: Response) => {
    try {
        const fichas = await obtenerFichasFirmadas();
        res.json(fichas);
    } catch (error) {
        console.error('Error en getFichas:', error);
        res.status(500).json({ error: 'Error al obtener las fichas' });
    }
}

export const putDesfirmar = async (req: Request, res: Response):Promise<void> => {
    const id_ficha = Number(req.params.id_ficha);
    const { desfirmarMedico, desfirmarEnfermeria } = req.body as {
        desfirmarMedico: boolean;
        desfirmarEnfermeria: boolean;
    };

    try {
        await actualizarFirma(id_ficha, desfirmarMedico, desfirmarEnfermeria);
        res.json({ message: 'Actualización exitosa' });
    } catch (error) {
        console.error('Error en putDesfirmar:', error);
        
        if ( error.message.includes('Al menos una de las opciones')) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: 'Error al actualizar la firma' });
    }
}

