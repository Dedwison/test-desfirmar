import React, { JSX } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Ficha } from './../types/ficha';

interface Props {
    fichas: Ficha[];
    onClickDesfirmar: (
        id: number,
        tipo: 'medico' | 'enfermeria'  | 'ambos',
        nombreCompleto: string,
        rut: string
    ) => void;
}

const DesfirmarTable = ({ fichas, onClickDesfirmar }: Props) => {

    const rows = fichas.map(f => ({
        id: f.id_ficha,
        nombre: `${f.nombre} ${f.a_paterno} ${f.a_materno}`,
        rut: f.rut,
        fecha: new Date(f.fecha).toISOString().split('T')[0],
        firma_medico: f.firma_medico,
        firma_enfermeria: f.firma_enfermeria
    }));

    const columns: GridColDef[] = [
        { field: 'nombre', headerName: 'Nom. Paciente', flex: 0.8},
        { field: 'rut', headerName: 'RUT Paciente', flex: 0.6},
        { field: 'fecha', headerName: 'Fecha Proc', flex: 0.4},
        {
            field: 'acciones',
            headerName: 'Acción',
            // type: 'actions',
            flex: 1.2,
            renderCell: (params) => {
                const ficha = fichas.find(f => f.id_ficha === params.id);
                if (!ficha) return null;

                const nombre = `${ficha.nombre} ${ficha.a_paterno} ${ficha.a_materno}`;
                const rut = ficha.rut;

                const botones: JSX.Element[] = [];

                if (ficha.firma_medico === true) {
                    botones.push(
                        <Button
                            key="medico"
                            variant="contained"
                            size="small"
                            onClick={() => onClickDesfirmar(ficha.id_ficha, 'medico', nombre, rut)}
                            style={{ marginRight: 4 }}
                        >
                            Desfirmar M.
                        </Button>
                    );
                }

                if (ficha.firma_enfermeria === true) {
                    botones.push(
                        <Button
                            key="enfermeria"
                            variant="contained"
                            size="small"
                            color="warning"
                            onClick={() => onClickDesfirmar(ficha.id_ficha, 'enfermeria', nombre, rut)}
                            style={{ marginRight: 4 }}
                        >
                            Desfirmar E.
                        </Button>
                    );
                }

                if (ficha.firma_medico === true && ficha.firma_enfermeria === true) {
                    botones.push(
                        <Button
                            key="ambos"
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() => onClickDesfirmar(ficha.id_ficha, 'ambos', nombre, rut)}
                        >
                            Desfirmar A.
                        </Button>
                    );
                }

                return <>{botones}</>;
            }
        }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 }
                    }
                }}
                disableRowSelectionOnClick                
            />
        </div>
    );
}

export default DesfirmarTable