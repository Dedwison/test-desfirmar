"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarFirma = exports.obtenerFichasFirmadas = void 0;
const db_1 = __importDefault(require("./../db"));
const obtenerFichasFirmadas = async () => {
    const sql = `
    SELECT
        f.id_ficha,
        f.id_paciente,
        f.fecha,
        f.firma_medico,
        f.firma_enfermeria,
        p.nombre,
        p.a_paterno,
        p.a_materno,
        p.rut
    FROM ficha f
    JOIN paciente p ON f.id_paciente = p.id_paciente
    WHERE f.firma_medico = true OR f.firma_enfermeria = true
    ORDER BY f.id_ficha DESC;
    `;
    const result = await db_1.default.query(sql);
    return result.rows;
};
exports.obtenerFichasFirmadas = obtenerFichasFirmadas;
const actualizarFirma = async (id_ficha, desfirmarMedico, desfirmarEnfermeria) => {
    if (!desfirmarMedico && !desfirmarEnfermeria) {
        throw new Error('Al menos una de las opciones (desfirmarMedico/desfirmarEnfermeria) debe ser true');
    }
    const camposParaSet = [];
    if (desfirmarMedico) {
        camposParaSet.push('firma_medico = false');
    }
    if (desfirmarEnfermeria) {
        camposParaSet.push('firma_enfermeria = false');
    }
    const sql = `
        UPDATE ficha
        SET ${camposParaSet.join(', ')}
        WHERE id_ficha = $1;
    `;
    await db_1.default.query(sql, [id_ficha]);
};
exports.actualizarFirma = actualizarFirma;
