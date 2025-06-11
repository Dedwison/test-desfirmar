
export interface Ficha {
    id_ficha: number;
    id_paciente: number;
    fecha: string;
    firma_medico: number;
    firma_enfermeria: number;

    nombre: string;
    a_paterno: string;
    a_materno: string;
    rut: string;
}