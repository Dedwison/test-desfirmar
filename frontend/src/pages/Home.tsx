import React, {  useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useFichas } from '../hooks/useFichas';
import DesfirmarTable from '../components/DesfirmarTable';
import ConfirmModal from '../components/ConfirmarModal';

type TipoDesfirmar = 'medico' | 'enfermeria' | 'ambos'; 

interface Pendiente {
    id: number;
    tipo: TipoDesfirmar;
    mensaje: string;
}

const Home = () => {
    const {
        fichas,
        loading,
        error,
        handleDesfirmar
    } = useFichas();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [pendiente, setPendiente] = useState<Pendiente | null>(null); 

    const abrirModal = (
        id: number,
        tipo: TipoDesfirmar,
        nombre: string,
        rut: string
    ) => {
        let texto = '';
        if (tipo === 'medico') {
            texto = `¿Desea desfirmar el Informe Médico de ${nombre} (${rut})?`;
        } else if (tipo === 'enfermeria') {
            texto = `¿Desea desfirmar el Informe de Enfermería de ${nombre} (${rut})?`;
        } else if (tipo === 'ambos') {
            texto = `¿Desea desfirmar ambos informes de ${nombre} (${rut})?`;
        }
        setPendiente({ id, tipo, mensaje: texto });
        setModalOpen(true);
    }

    const confirmar = async () => {
        if (!pendiente) return;

        const { id, tipo } = pendiente;

        const payload = {
            desfirmarMedico: tipo === 'medico' || tipo === 'ambos',
            desfirmarEnfermeria: tipo === 'enfermeria' || tipo === 'ambos'
        };

        try {
            await handleDesfirmar(id, payload);
        } catch (error) {
            console.log(error)
        }
        setModalOpen(false);
        setPendiente(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Desfirmar Informes
            </Typography>

            {loading && <Typography variant="body1">Cargando...</Typography>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}

            {!loading && !error && fichas.length === 0 && (
                <Typography variant="body1">No hay fichas pendientes de desfirmar.</Typography>
            )}

            {!loading && !error && fichas.length > 0 && (
                <DesfirmarTable
                    fichas={fichas}
                    onClickDesfirmar={abrirModal}
                />
            )}

            <ConfirmModal
                open={modalOpen}
                mensaje={pendiente?.mensaje || ''}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmar}
            />
        </Container>
    );    
}

export default Home;