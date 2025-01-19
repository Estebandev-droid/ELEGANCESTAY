# EleganceStay Backend

Este es el backend de la aplicación web "EleganceStay", diseñada para gestionar hoteles. Utiliza el stack MERN (MongoDB, Express, React, Node.js) y está construido con buenas prácticas de desarrollo.

## Estructura del Proyecto

```
elegance-stay-backend
├── src
│   ├── controllers
│   │   └── hotelController.js  # Controlador para manejar la lógica de los hoteles
│   ├── models
│   │   └── hotelModel.js        # Modelo de datos para los hoteles
│   ├── routes
│   │   └── hotelRoutes.js       # Rutas para las operaciones de hoteles
│   ├── app.js                   # Punto de entrada de la aplicación
│   └── config
│       └── db.js               # Configuración de la conexión a la base de datos
├── package.json                 # Configuración de npm y dependencias
├── .env                         # Variables de entorno
├── .gitignore                   # Archivos y carpetas a ignorar por Git
└── README.md                    # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd elegance-stay-backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno en el archivo `.env`:
   ```
   MONGODB_URI=<TU_URI_DE_MONGODB>
   ```

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:
```
npm start
```

El servidor se ejecutará en `http://localhost:5000`.

## Rutas

- `POST /hotels` - Crear un nuevo hotel
- `GET /hotels` - Obtener la lista de hoteles
- `PUT /hotels/:id` - Actualizar un hotel existente
- `DELETE /hotels/:id` - Eliminar un hotel

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.