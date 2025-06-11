import { Request, Response, NextFunction } from 'express';

export const validatePutDesfirmar = (req: Request, res: Response, next: NextFunction): void => {
    const { id_ficha } = req.params;
    const { desfirmarMedico, desfirmarEnfermeria } = req.body;
    
   if (isNaN(Number(id_ficha))) {
        res.status(400).json({ error: 'El id_ficha debe ser un número válido' });
        return
    }

    if (typeof desfirmarMedico !== 'boolean' || typeof desfirmarEnfermeria !== 'boolean') {
        res.status(400).json({ error: 'Los campos desfirmarMedico y desfirmarEnfermeria deben ser booleanos' });
        return
    }

    next();
}