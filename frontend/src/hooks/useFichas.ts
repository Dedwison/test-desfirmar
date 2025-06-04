import { useState, useEffect, useCallback } from 'react';
import { Ficha } from './../types/ficha';
import { getFichas, desfirmar, DesfirmarPayload } from '../api/fichaApi'; 

export const useFichas = () => {
    const [fichas, setFichas] = useState<Ficha[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getFichas();
            setFichas(data);
            setError(null);
        } catch (error: any) {
            setError(error.message || 'Error al cargar las fichas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    // Funcion para invocar el desfirmar (puede ser médoco, enfermería o ambos) 
    const handleDesfirmar = async (
        id_ficha: number,
        payload: DesfirmarPayload
    ) => {
        await desfirmar(id_ficha, payload);

        // Actualiza localmente el estado sin volver a llamar GET: 
        setFichas(prev => 
            prev.filter(f => {
                // Si ya se desfirmaron ambos (payload desfirmarMedico && desfirmarEnfermeria)
                if ( payload.desfirmarMedico && payload.desfirmarEnfermeria) {
                    return f.id_ficha !== id_ficha;
                }

                // Si solo se desfirmo Médico, queda el registro solo si aún tiene firmaEnfermeria = 1
                if (payload.desfirmarMedico && !payload.desfirmarEnfermeria) {
                    return f.id_ficha !== id_ficha || f.firma_enfermeria === 1;
                }

                // Si solo se desfirmó Enfermería, queda el registro solo si aún tiene firmaMedico = 1 
                if (!payload.desfirmarMedico && payload.desfirmarEnfermeria) {
                    return f.id_ficha !== id_ficha || f.firma_medico === 1;
                }

                // si no desfirma, no cambia nada.
                return true;
            })
        );
    };

    return {
        fichas,
        loading,
        error,
        fetchAll,
        handleDesfirmar
    };
}
