
export interface Ficha {
    id_ficha: number;
    id_paciente: number;
    fecha: string;
    firma_medico: boolean;
    firma_enfermeria: boolean;

    nombre: string;
    a_paterno: string;
    a_materno: string;
    rut: string;
}