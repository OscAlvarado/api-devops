# API DevOps

API REST básica desarrollada con Node.js, Express y PostgreSQL como parte de una práctica de DevOps, despliegue cloud y CI/CD.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Git
- GitHub
- dotenv

## Funcionalidades

La API permite:

- Verificar que el servidor está funcionando.
- Verificar la conexión con PostgreSQL.
- Consultar productos almacenados en la base de datos.
- Agregar nuevos productos.

## Requisitos

Para ejecutar el proyecto localmente se necesita:

- Node.js
- npm
- PostgreSQL
- Git

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/OscAlvarado/api-devops.git
```

Entrar en la carpeta del proyecto:

```bash
cd api-devops
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=api_devops_db
```

El archivo `.env` no debe subirse al repositorio porque contiene información sensible.

## Base de datos

Crear una base de datos PostgreSQL llamada:

```text
api_devops_db
```

Crear la tabla:

```sql
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
);
```

## Ejecutar la aplicación

Iniciar el servidor:

```bash
node index.js
```

La API estará disponible localmente en:

```text
http://localhost:3000
```

## Endpoints

### API principal

```http
GET /
```

Respuesta de ejemplo:

```json
{
  "mensaje": "API DevOps funcionando correctamente"
}
```

### Monitoreo

```http
GET /health
```

Respuesta de ejemplo:

```json
{
  "estado": "OK",
  "mensaje": "API operativa"
}
```

### Prueba de PostgreSQL

```http
GET /db-test
```

Permite comprobar que la aplicación puede conectarse correctamente con PostgreSQL.

### Consultar productos

```http
GET /productos
```

Devuelve todos los productos registrados.

### Agregar producto

```http
POST /productos
```

Ejemplo del cuerpo de la solicitud:

```json
{
  "nombre": "Leche",
  "precio": 1.50,
  "stock": 15
}
```

## Seguridad

Las credenciales y configuraciones sensibles se manejan mediante variables de entorno.

El archivo `.env` está excluido del repositorio mediante `.gitignore`.

Se incluye `.env.example` como referencia para configurar el proyecto.

## Estado del proyecto

Actualmente la API funciona de manera local con Express y PostgreSQL.

Las siguientes etapas del proyecto incluyen:

- Despliegue en plataforma cloud.
- Monitoreo en producción.
- Plan de backups.
- Pipeline CI/CD.