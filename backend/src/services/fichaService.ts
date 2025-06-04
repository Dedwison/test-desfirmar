import pool from './../db';
import { FichaConPaciente } from './../models/fichaConPaciente';

export const obtenerFichasFirmadas = async (): Promise<FichaConPaciente[]> => {
    const sql = `
    SELECT
        f.id_ficha,
        f.id_paciente,
        f.fecha,
        f.firma_medico,
        f.firma_enfermeria,
        p.nombre,
        p.apellido,
        p.materno,
        p.rut
    FROM ficha f
    JOIN paciente p ON f.id_paciente = p.id_paciente
    WHERE f.firma_medico = 1 OR f.firma_enfermeria = 1
    ORDER BY f.id_ficha DESC;
    `;
    const result = await pool.query<FichaConPaciente>(sql);
    return result.rows;
}
export const actualizarFirma = async (
    id_ficha: number,
    desfirmarMedico: boolean,
    desfirmarEnfermeria: boolean
): Promise<void> => {
    if (!desfirmarMedico && !desfirmarEnfermeria) {
        throw new Error('Al menos una de las opciones (desfirmarMedico/desfirmarEnfermeria) debe ser true');
    }

    const camposParaSet: string[] = [];
    if (desfirmarMedico) {
        camposParaSet.push('firma_medico = 0');
    }
    if (desfirmarEnfermeria) {
        camposParaSet.push('firma_enfermeria = 0');
    }

    const sql = `
        UPDATE ficha
        SET ${camposParaSet.join(', ')}
        WHERE id_ficha = $1;
    `;
    await pool.query(sql, [id_ficha]);
}