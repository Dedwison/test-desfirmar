# MedSolution - Sistema de Desfirmar

Sistema para gestionar firmas médicas y de enfermería en fichas de pacientes.

## Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **TypeScript** - tipado estricto para javascript
- **Express.js** - Framework backend
- **PostgreSQL** - Base de datos
- **pg** - Cliente PostgreSQL para Node.js

### Frontend
- **React** - Libreria javascript
- **TypeScript** - tipado estricto para javascript
- **Material-UI (MUI)** - Componentes de interfaz
- **MUI DataGrid** - Tabla de datos

## Configuración del Proyecto

### Prerrequisitos
- Node.js (versión 16 o superior)
- PostgreSQL
- npm

### 1. Configuración de la Base de Datos

Conectarse a PostgreSQL:
```bash
psql -U postgres -h localhost -p 5433
```

Crear la base de datos:
```sql
CREATE DATABASE medsolution_db;
```

Conectarse a la base de datos específica:
```bash
psql -U postgres -h localhost -p 5433 -d medsolution_db
```

Crear las tablas:
```sql
CREATE TABLE paciente (
    id_paciente SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    a_paterno VARCHAR(255) NOT NULL,
    a_materno VARCHAR(255) NOT NULL,
    rut VARCHAR(12) UNIQUE NOT NULL
);

CREATE TABLE ficha (
    id_ficha SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES paciente(id_paciente),
    fecha DATE NOT NULL,
    firma_medico BOOLEAN DEFAULT FALSE,
    firma_enfermeria BOOLEAN DEFAULT FALSE
);
```

Salir de PostgreSQL:
```bash
\q
```

### 2. Configuración del Backend

Navegar al directorio del backend:
```bash
cd backend
```

Instalar dependencias:
```bash
npm install
```

Configurar variables de entorno:
```bash
cp .env.template .env
```

Editar el archivo `.env` con tus credenciales de base de datos.

Compilar el proyecto:
```bash
npm run build
```

Poblar la base de datos con datos de prueba:
```bash
npm run seed
```

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El backend estará disponible en `http://localhost:4000`

### 3. Configuración del Frontend

Abrir una nueva terminal y navegar al directorio del frontend:
```bash
cd frontend
```

Instalar dependencias:
```bash
npm install
```

Compilar el proyecto:
```bash
npm run build
```

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Comandos Útiles

### Backend
- `npm run build` - Transpila el proyecto TypeScript a javascrip en la carpeta dist
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run seed` - Pobla la base de datos con datos de prueba

### Frontend
- `npm run build` - Transpila el proyecto TypeScript a javascrip en la carpeta dist
- `npm run dev` - Inicia el servidor de desarrollo

## Estructura del Proyecto

```
medsolution-desfirmar-prueba/
├── backend/
│   ├── src/
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   └── ...
│   ├── .env.template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── DesfirmarTable.tsx
│   │   └── ...
│   └── package.json
└── README.md
```

## Funcionalidades

- Visualización de fichas de pacientes
- Gestión de firmas médicas y de enfermería
- Desfirmar fichas individualmente o ambas firmas
- Interfaz responsiva con Material-UI

## Notas Importantes

- Asegurar que PostgreSQL esté ejecutándose antes de iniciar el backend
- El puerto de PostgreSQL en este proyecto es 5433 (ajusta según tu configuración)
- Los datos de prueba incluyen 5 pacientes con diferentes estados de firma
