# SAM (Sistema de Asesorias y Mentorias) Foper 2025

Este documento especifica los requerimientos del proyecto “Aplicación de mentoría/asesoría”. Su propósito es definir detalladamente las funcionalidades y limitaciones del sistema para satisfacer las necesidades de los usuarios finales y garantizar que los miembros del equipo y otros interesados tengan una referencia sobre el proyecto. Está destinado a todos los miembros del equipo involucrados en la creación y despliegue del sistema.

---

## Objetivos

### Objetivo general
Tener un control sistematizado de las asesorías que da cada profesor mediante la implementación de un sistema integral para todas las partes involucradas, entregando un registro y un historial de cada asesoría para poder comprobar las asesorías realizadas.

### Objetivos específicos
- Proporcionar una plataforma web completamente funcional.
- Generación de PDFs con la información de cada asesoría.
- Generar un historial de asesorías.
- Vista de administrador para ver y validar registros.

---

## Alcance
El sistema proporcionará una herramienta de verificación de asesorías a través de la generación de registros e historiales. Permitirá a administradores verificar las asesorías brindadas y a profesores exportar constancias de cada servicio en PDF.

---

## Descripción general

### Perspectiva del producto
Aplicación web que permitirá a profesores y administradores gestionar y verificar asesorías de manera eficiente. Ofrece registro y almacenamiento de asesorías, generación de historiales y exportación en PDF con la información suficiente para comprobar la asistencia a cada sesión. Contará con una interfaz intuitiva y responsiva, además de una vista de administrador para monitoreo y verificación.

### Funciones del producto
- Registro de asesorías: nombre del estudiante, expediente, fecha, hora, tema, materia, carrera y otros datos relevantes.
- Historial de asesorías: historial completo de sesiones con posibilidad de consulta y exportación a PDF.
- Generación de PDF: exportar datos de cada asesoría en formato PDF como constancia.
- Verificación por administradores: validar y comprobar las asesorías registradas por los profesores.
- Plataforma responsiva: interfaz adaptada a distintos dispositivos.
- Gestión de usuarios: roles (administradores, profesores, alumnos) con permisos específicos.

---

## Características de los usuarios

### Profesor
- Registrar asesorías (nombre del alumno, expediente, fecha, hora, tema, materia).
- Generar y exportar constancias en PDF.
- Acceder al historial de sus asesorías.
- Proveer credenciales de alumnos para registro.

### Alumno
- Proveer credenciales correctas al profesor para el registro de sesión.

### Administrador
- Acceder a informes y estadísticas (número de asesorías, desempeño, etc.).

---

## Restricciones
- Plataforma: compatible con navegadores web modernos (Chrome, Firefox, Safari, Edge).
- Disponibilidad: accesible desde dispositivos con conexión a Internet.
- Almacenamiento: se gestionarán los datos proporcionados por el cliente.
- Seguridad: acceso a módulos restringido por rol (autenticación/autorización).

## Requisitos específicos

### Requisitos de interfaces externas
- Compatibilidad de hardware: computadoras y laptops.
- Compatibilidad de software: navegadores web modernos.
- Comunicaciones: todas las comunicaciones entre servidor y cliente deben estar cifradas mediante HTTPS.
- Interfaz de usuario: intuitiva, responsiva y con mensajes de error claros.

### Requisitos funcionales
- Gestión de asesorías: registro y consulta por parte de profesores (incluye timestamp, materia por autocompletado, nombre del alumno, carrera, expediente).
- Generación de constancias (PDF): exportación en PDF para cada asesoría (biblioteca recomendada: pdf-lib o jsPDF).
- Consulta de asesorías por administradores: historial, detalles y descarga de constancias.

### Requisitos no funcionales
- Mantenibilidad: código conforme a buenas prácticas y estándares.
- Fiabilidad: alto tiempo de actividad para funciones críticas.
- Compatibilidad: soporte para navegadores populares.
- Tiempo de carga: páginas deben cargar en < 15 segundos bajo condiciones de red estándar.
- Manejo de transacciones: operaciones críticas no deben degradar el rendimiento.
- Responsividad: diseño adaptativo en móviles, tablets y escritorio.
- Usabilidad: interfaz clara sin necesidad de capacitación avanzada.
- Identidad visual: respetar la paleta de colores proporcionada por la facultad.

---

## Dependencias (principales)

Listado resumido y con breve descripción (mejor visual tipo tarjeta):

- **@prisma/client** — Cliente de Prisma para acceso a PostgreSQL.
- **next** — Framework React (App Router) para la aplicación.
- **react** / **react-dom** — Biblioteca UI principal.
- **pdf-lib** — Generación y manipulación de PDFs en el servidor.
- **@tanstack/react-table** — Tablas y grids reactivas.
- **recharts** — Gráficas y visualización de datos.
- **@radix-ui/react-*** — Componentes UI accesibles (dialog, select, label, separator, slot).
- **sonner** — Notificaciones y toasts.
- **lucide-react** — Iconos SVG.
- **clsx** / **class-variance-authority** — Utilidades para clases CSS y variantes.
- **uuid** — Generación de identificadores únicos.
- **jsonwebtoken** / **jose** — Gestión y firma de JWT.

Dependencias de desarrollo (breve):
- **prisma** — ORM y migraciones.
- **typescript** — Tipado estático.
- **eslint** / **eslint-config-next** — Linter y reglas Next.js.
- **tailwindcss** / **postcss** — Estilos y utilidades CSS.
- **@types/*** — Tipos para TypeScript (node, react, jsonwebtoken, etc.)

---

## Estructura del proyecto 
Raíz del proyecto con carpetas y archivos principales:

```
SAM_Fork/
├─ README.md
├─ package.json
├─ .env
├─ prisma/
│  └─ schema.prisma
├─ public/
├─ admins.json
├─ carreras.json
└─ src/
   ├─ middleware.ts
   ├─ app/
   │  ├─ globals.css
   │  ├─ layout.tsx
   │  ├─ page.tsx
   │  ├─ (admin)/
   │  │  └─ dashboard/
   │  │     ├─ layout.tsx
   │  │     ├─ page.tsx
   │  │     ├─ estadisticas/
   │  │     │  └─ page.tsx
   │  │     ├─ gestion-de-usuarios/
   │  │     │  ├─ page.tsx
   │  │     │  └─ alumnos-asignados/
   │  │     └─ historial/
   │  │        ├─ page.tsx
   │  │        └─ [name]/
   │  └─ (user)/
   │     └─ user-dashboard/
   │        ├─ layout.tsx
   │        ├─ page.tsx
   │        ├─ historialAsesorias/
   │        │  └─ [name]/
   │        └─ registro/
   │           └─ page.tsx
   ├─ api/
   │  ├─ advisories/
   │  │  ├─ route.ts
   │  │  ├─ register/route.ts
   │  │  └─ update/route.ts
   │  ├─ auth/
   │  │  ├─ login/route.ts
   │  │  ├─ logout/route.ts
   │  │  └─ register/
   │  │     ├─ students/route.ts
   │  │     └─ teachers/route.ts
   │  ├─ careers/route.ts
   │  ├─ db/route.ts
   │  ├─ pdf/[id]/route.ts
   │  ├─ seed/route.ts
   │  ├─ statistics/
   │  │  ├─ subject/route.ts
   │  │  └─ teacher/route.ts
   │  ├─ students/
   │  │  ├─ route.ts
   │  │  ├─ [id]/route.ts
   │  │  └─ register/route.ts
   │  ├─ subjects/filter/route.ts
   │  └─ teachers/
   │     ├─ route.ts
   │     └─ [cveMaestro]/route.ts
   ├─ components/
   │  ├─ Asesorias-chart.tsx
   │  ├─ login-form.tsx
   │  ├─ signup-form.tsx
   │  ├─ dashboard/
   │  ├─ forms/
   │  ├─ layout/
   │  ├─ tables/
   │  └─ ui/
   ├─ lib/
   │  ├─ db.ts
   │  ├─ downloadPDF.ts
   │  ├─ dataStudent.ts
   │  └─ utils.ts
   ├─ types/
   ├─ data/
   └─ const/
```

(La carpeta `src/app/api` contiene múltiples route handlers; ver árbol completo del repositorio para detalles.)

---

## Cómo ejecutar el proyecto (dev)
1. Instalar dependencias:
```bash
npm install
```
2. Configurar variables de entorno en `.env` (DATABASE_URL, JWT_SECRET, API_URL, etc.).
3. Ejecutar migraciones / generar cliente Prisma:
```bash
npx prisma migrate dev
npx prisma generate
```
4. Iniciar en modo desarrollo:
```bash
npm run dev
```

---

## Notas finales
- Asegurar que las variables de entorno estén correctas y las credenciales de la base de datos codificadas correctamente en `DATABASE_URL`.
- Para pruebas rápidas de seed: llamar a `POST /api/seed`.
