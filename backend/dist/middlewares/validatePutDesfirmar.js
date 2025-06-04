"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePutDesfirmar = void 0;
const validatePutDesfirmar = (req, res, next) => {
    const { id_ficha } = req.params;
    const { desfirmarMedico, desfirmarEnfermeria } = req.body;
    if (isNaN(Number(id_ficha))) {
        res.status(400).json({ error: 'El id_ficha debe ser un número válido' });
        return;
    }
    if (typeof desfirmarMedico !== 'boolean' || typeof desfirmarEnfermeria !== 'boolean') {
        res.status(400).json({ error: 'Los campos desfirmarMedico y desfirmarEnfermeria deben ser booleanos' });
        return;
    }
    next();
};
exports.validatePutDesfirmar = validatePutDesfirmar;
