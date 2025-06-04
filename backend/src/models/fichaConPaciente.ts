export interface FichaConPaciente {
    id_ficha: number;
    id_paciente: number;
    fecha: string;
    firma_medico: number;
    firma_enfemeria: number;

    nombre: string;
    a_paterno: string;
    a_materno: string;
    rut: string;
}