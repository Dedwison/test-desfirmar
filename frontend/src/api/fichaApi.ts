import axios from 'axios';
import { Ficha } from '../types/ficha';

const instanciaAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
});

export const getFichas = async (): Promise<Ficha[]> => {
    const resp = await instanciaAxios.get<Ficha[]>('api/fichas');
    return resp.data;
};

export interface DesfirmarPayload {
    desfirmarMedico: boolean;
    desfirmarEnfermeria: boolean;
}

export const desfirmar = async (
    id_ficha: number,
    payload: DesfirmarPayload
): Promise<void> => {
    await instanciaAxios.put(`api/fichas/${id_ficha}/desfirmar`, payload);
}