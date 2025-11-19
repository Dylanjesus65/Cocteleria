# Cocteleria — Visión general

Proyecto full-stack con un frontend en Next.js y un backend en Node/Express que guarda datos en PostgreSQL.

## Estructura principal
- [backend](backend/) — servidor REST y acceso a la base de datos.
- [frontend](frontend/) — aplicación Next.js (UI).
- [.gitignore](.gitignore)

## Backend (cómo funciona)
El backend crea un servidor Express en [backend/app.js](backend/app.js) que expone rutas REST para gestionar cócteles:

Rutas principales (ver [`backend/app.js`](backend/app.js)):
- GET /api/cocktails — listar todos los cócteles
- GET /api/cocktails/:id — obtener cóctel por id
- POST /api/cocktails — crear cóctel# 🍹 Cocteleria App - Prueba Técnica Full Stack

Aplicación web moderna para la gestión y búsqueda de cócteles. Este proyecto implementa una arquitectura Full Stack completa con persistencia de datos.

## 🚀 Stack Tecnológico

* **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS (v4), Lucide Icons.
* **Backend:** Node.js, Express.
* **Base de Datos:** PostgreSQL.
* **Cliente HTTP:** Axios.

## ✨ Funcionalidades Principales

* **CRUD Completo:** Crear, Leer, Editar y Eliminar cócteles.
* **Buscador en Tiempo Real:** Filtrado instantáneo por nombre o ingredientes.
* **Favoritos:** Sistema de "Me gusta" con persistencia local (LocalStorage).
* **Diseño Responsivo:** Interfaz moderna y adaptada a móviles con Glassmorphism.

---

## 🛠️ Guía de Instalación y Ejecución

Sigue estos pasos para correr el proyecto en tu máquina local.

### 1. Configuración de la Base de Datos (PostgreSQL)

1.  Asegúrate de tener PostgreSQL instalado y corriendo.
2.  Crea una base de datos llamada: `cocteles_db`.
3.  Ejecuta el script SQL ubicado en: `backend/database.sql`.
    * *Este script creará la tabla `cocktails` e insertará 12 cócteles de prueba.*
4.  **Importante:** Abre el archivo `backend/db.js` y actualiza la contraseña (`password`) con la tuya.

### 2. Ejecutar el Backend (API)

```bash
cd backend
npm install
npm start
- PUT /api/cocktails/:id — actualizar cóctel
- DELETE /api/cocktails/:id — borrar cóctel

El acceso a PostgreSQL se realiza mediante la conexión exportada en [`pool`](backend/db.js) ([backend/db.js](backend/db.js)). Los datos y la estructura de la BD están en [backend/database.sql](backend/database.sql). Hay también un [backend/db.json](backend/db.json) (posible seed/data).

Notas importantes:
- Edita credenciales en [`pool`](backend/db.js) antes de arrancar si tus datos difieren.
- Para ver las consultas y lógica, abre [backend/app.js](backend/app.js).

## Base de datos
- Archivo con esquema/seed: [backend/database.sql](backend/database.sql)
- Conexión/Pool: [`pool`](backend/db.js) ([backend/db.js](backend/db.js))

## Frontend (cómo funciona)
El frontend es una app Next.js ubicada en [frontend/](frontend/). La UI consume las rutas del backend descritas arriba.

Archivos clave:
- Documentación local: [frontend/README.md](frontend/README.md)
- Código fuente UI: [frontend/src/app](frontend/src/app)
- Dependencias y scripts: [frontend/package.json](frontend/package.json)

## Cómo ejecutar (desarrollo)
1. Backend
   ```sh
   cd backend
   npm install    # o yarn / pnpm
   node app.js    # o usar el script definido en [backend/package.json](backend/package.json)
   ```
   El servidor arranca en el puerto configurado (por defecto 3001 en [backend/app.js](backend/app.js)).

2. Frontend
   ```sh
   cd frontend
   npm install
   npm run dev    # o yarn dev / pnpm dev (ver [frontend/package.json](frontend/package.json))
   ```
   Abrir http://localhost:3000

Ejemplos de prueba (desde la terminal):
- Listar cócteles:
  ```sh
  curl http://localhost:3001/api/cocktails
  ```
- Crear (JSON):
  ```sh
  curl -X POST http://localhost:3001/api/cocktails -H "Content-Type: application/json" -d '{"nombre":"Mojito","ingredientes":"...","instrucciones":"...","fotoUrl":"..."}'
  ```

## Consejos para desarrollo
- No dejes credenciales en el código; mueve a variables de entorno y actualiza [`pool`](backend/db.js).
- Revisa [backend/database.sql](backend/database.sql) antes de crear la BD.
- Para depuración, inspecciona la salida en la terminal donde arranca el backend (console.log en [backend/app.js](backend/app.js)).

## Archivos importantes (rápido acceso)
- Backend server y rutas: [backend/app.js](backend/app.js)
- Conexión DB (pool): [`pool`](backend/db.js) — [backend/db.js](backend/db.js)
- SQL esquema/seed: [backend/database.sql](backend/database.sql)
- Frontend README: [frontend/README.md](frontend/README.md)
- Frontend source: [frontend/src/app](frontend/src/app)
- Backend package.json (scripts/deps): [backend/package.json](backend/package.json)
- Frontend package.json (scripts/deps): [frontend/package.json](frontend/package.json)