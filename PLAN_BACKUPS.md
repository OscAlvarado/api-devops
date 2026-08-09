# Plan de Backups - API DevOps

## 1. Objetivo

Establecer un procedimiento básico de respaldo y recuperación para proteger la información almacenada en la base de datos PostgreSQL utilizada por la API DevOps.

## 2. Información que será respaldada

Se respaldará la base de datos:

api_devops_db

El respaldo incluirá:

- Estructura de la base de datos.
- Tabla productos.
- Registros almacenados en la tabla productos.
- Relaciones, claves y demás objetos que se incorporen posteriormente.

## 3. Frecuencia de los respaldos

Para este proyecto se establece la siguiente frecuencia:

- Respaldo diario durante el período de desarrollo.
- Respaldo adicional antes de realizar cambios importantes en la base de datos.
- Respaldo adicional antes de realizar una actualización importante de la aplicación.

## 4. Herramienta utilizada

Se utilizará la herramienta oficial de PostgreSQL:

pg_dump

Ejemplo:

pg_dump "URL_DE_CONEXION" > backup_api_devops.sql

Las credenciales reales de la base de datos no deberán almacenarse en este documento ni publicarse en GitHub.

## 5. Almacenamiento de los respaldos

Los archivos de respaldo deberán almacenarse fuera del servidor principal.

Se propone utilizar:

- Carpeta local protegida del responsable del sistema.
- Google Drive como segunda ubicación de respaldo.

Nombre sugerido para los archivos:

backup_api_devops_AAAA-MM-DD.sql

Ejemplo:

backup_api_devops_2026-08-08.sql

## 6. Política de retención

Se conservarán:

- Los últimos 7 respaldos diarios.
- Un respaldo adicional antes de cambios importantes.
- El respaldo final del proyecto.

Los respaldos antiguos podrán eliminarse después de verificar que existe una copia reciente y funcional.

## 7. Procedimiento de recuperación

Ante una pérdida o corrupción de información:

1. Identificar el último respaldo válido.
2. Crear o disponer de una base PostgreSQL operativa.
3. Verificar las credenciales de acceso.
4. Restaurar el archivo de respaldo mediante PostgreSQL.
5. Verificar que las tablas hayan sido recuperadas.
6. Comprobar que los registros estén disponibles.
7. Ejecutar las pruebas de la API.
8. Verificar los endpoints /health y /productos.

Ejemplo de restauración:

psql "URL_DE_CONEXION" < backup_api_devops.sql

## 8. Verificación del respaldo

Después de realizar un respaldo se deberá comprobar:

- Que el archivo fue creado correctamente.
- Que el archivo no tiene tamaño de 0 KB.
- Que se encuentra almacenado en la ubicación definida.
- Que puede utilizarse para realizar una restauración de prueba.

## 9. Responsabilidad

El responsable del proyecto deberá realizar y verificar los respaldos durante el desarrollo y antes de cambios importantes.

## 10. Consideraciones de seguridad

- No almacenar contraseñas dentro de los archivos de documentación.
- No publicar URLs de conexión que contengan credenciales.
- Mantener los respaldos en ubicaciones con acceso controlado.
- Evitar publicar archivos de respaldo con información sensible en GitHub.

## 11. Estrategia aplicada al entorno actual

La aplicación utiliza PostgreSQL alojado en Render.

Debido a que el proyecto utiliza un plan gratuito para fines académicos, se realizará un respaldo lógico manual mediante pg_dump y se conservará una copia local y otra copia externa.

Esta estrategia permite disponer de una copia independiente de la base de datos ante eliminación accidental, errores durante el desarrollo o pérdida de acceso al servicio cloud.