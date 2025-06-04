"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putDesfirmar = exports.getFichas = void 0;
const fichaService_1 = require("./../services/fichaService");
const getFichas = async (req, res) => {
    try {
        const fichas = await (0, fichaService_1.obtenerFichasFirmadas)();
        res.json(fichas);
    }
    catch (error) {
        console.error('Error en getFichas:', error);
        res.status(500).json({ error: 'Error al obtener las fichas' });
    }
};
exports.getFichas = getFichas;
const putDesfirmar = async (req, res) => {
    const id_ficha = Number(req.params.id_ficha);
    const { desfirmarMedico, desfirmarEnfermeria } = req.body;
    try {
        await (0, fichaService_1.actualizarFirma)(id_ficha, desfirmarMedico, desfirmarEnfermeria);
        res.json({ message: 'Actualización exitosa' });
    }
    catch (error) {
        console.error('Error en putDesfirmar:', error);
        const err = error;
        if (err.message.includes('Al menos una de las opciones')) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(500).json({ error: 'Error al actualizar la firma' });
    }
};
exports.putDesfirmar = putDesfirmar;
