import pool from './../src/db';

const seed = async () => {
    try {
        // Insertar pacientes (si la tabla está vacía)
        await pool.query(`
            INSERT INTO paciente (nombre, a_paterno, a_materno, rut)
            VALUES
                ('Juan', 'Pérez', 'Gómez', '12345678-9'),
                ('María', 'López', 'Hernández', '98765432-1'),
                ('Carlos', 'Gómez', 'Martínez', '11223344-5'),
                ('Ana', 'Fernández', 'Sánchez', '55667788-9'),
                ('Luis', 'Ramírez', 'Torres', '99887766-5');
                ON CONFLICT (rut) DO NOTHING;
        `);

        // Insertar fichas (usamos los id_paciente generados: 1,2,3...)
        await pool.query(`
            INSERT INTO ficha (id_paciente, fecha, firma_medico, firma_enfermeria)
            VALUES
                (1, '2023-10-01', 1, 0),
                (2, '2023-10-02', 1, 1),
                (3, '2023-10-03', 0, 1),
                (4, '2023-10-04', 1, 0),
                (5, '2023-10-05', 0, 0);
        `);
        console.log('Datos de prueba insertados correctamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al insertar datos de prueba:', error);
        process.exit(1);
    }
}

seed();