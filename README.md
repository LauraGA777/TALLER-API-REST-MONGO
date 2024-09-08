# Sistema de Gestión de Parqueadero

Este proyecto implementa una API REST en Node.js con MongoDB para la gestión de un sistema de parqueadero. Permite registrar, actualizar, eliminar y consultar celdas de parqueo, así como gestionar el estacionamiento de vehículos.

## Requisitos

- Node.js
- MongoDB

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <https://github.com/LauraGA777/TALLER-API-REST-MONGO.git>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd <TALLER-API-REST-MONGO>
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura el archivo `.env` con la variable `MONGO_CNN` para la conexión a MongoDB y `PORT` para el puerto del servidor:

   ```env
   MONGO_CNN=<TU_URL_DE_CONEXIÓN_MONGODB>
   PORT=3000
   ```

## Endpoints

### POST /parking-spots

Registra hasta 10 celdas. El `spotNumber` es autoincremental y el `status` es "available" por defecto. Los demás campos son opcionales.

**Request Body:**

```json
{
    "spotNumber": 1,
    "status": "available",
    "vehiclePlate": "ABC123",
    "entryDate": "2024-09-06T08:30:00Z",
    "exitDate": "2024-09-06T10:30:00Z",
    "pin": "1234abc"
}
```

### GET /parking-spots

Lista todas las celdas.

### GET /parking-spots/:id

Obtiene una celda específica por su ID.

### GET /parking-spots?status=available

Lista todas las celdas según su estado (disponible/no disponible).

### PUT /parking-spots/:id

Actualiza una celda específica.

**Request Body:**

```json
{
    "status": "unavailable",
    "vehiclePlate": "XYZ789",
    "entryDate": "2024-09-06T08:30:00Z",
    "exitDate": "2024-09-06T10:30:00Z",
    "pin": "abcd1234"
}
```

### DELETE /parking-spots/:id

Elimina una celda específica.

### POST /parking-spots/park

Parquea un vehículo asignando una placa a una celda disponible y cambiando su estado a no disponible.

**Request Body:**

```json
{
    "vehiclePlate": "XYZ789"
}
```

### POST /parking-spots/exit/:id

Registra la salida de un vehículo. Cambia el estado de la celda a disponible y vacía los campos `vehiclePlate`, `entryDate`, `exitDate`, y `pin`.

**Request Body:**

```json
{
    "entryDate": "2024-09-06T08:30:00Z",
    "exitDate": "2024-09-06T10:30:00Z"
}
```

### GET /parking-spots/fee/:id

Calcula la tarifa basada en la diferencia entre `entryDate` y `exitDate`. La tarifa se cobra a 5000 COP por hora.

# Despliegue
El sistema también está desplegado en Render.com. Puedes acceder a la aplicación en el siguiente enlace:

- https://taller-api-rest-mongo.onrender.com

## Ejecución

Inicia el servidor:

```bash
npm start
```
O
```bash
node index.js
```

El servidor estará corriendo en `http://localhost:3000`.

### ¿Qué es un endpoint?

Un **endpoint** es una URL en una API a la que puedes enviar peticiones para obtener, enviar, actualizar o eliminar datos. Piensa en un endpoint como una dirección en la web a la que envías tus solicitudes para interactuar con un servicio. Por ejemplo, si tienes una API para un sistema de parqueadero, un endpoint podría ser `/parking-spots` para obtener la lista de todas las celdas de parqueo. Cada endpoint tiene una función específica que realiza una acción particular en el servidor.