# TechStore Backend

API RESTful para la tienda en línea TechStore, desarrollada con Node.js, Express y MongoDB.

## Características

- Autenticación y autorización con JWT
- Gestión de usuarios y roles
- Gestión de productos y categorías
- Gestión de pedidos y pagos
- Integración con Stripe y PayPal
- Validación de datos
- Manejo de errores
- Documentación de API

## Requisitos previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
cd backend
npm install
```

3. Configurar variables de entorno:
   - Crear un archivo `.env` basado en `.env.example`
   - Configurar las variables según tu entorno

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/         # Configuración de la aplicación
│   ├── controllers/    # Controladores de la API
│   ├── middleware/     # Middleware personalizado
│   ├── models/         # Modelos de datos (Mongoose)
│   ├── routes/         # Rutas de la API
│   ├── utils/          # Utilidades y helpers
│   └── index.js        # Punto de entrada de la aplicación
├── uploads/            # Directorio para archivos subidos
├── .env                # Variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias y scripts
└── README.md           # Documentación
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar un nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/password` - Cambiar contraseña
- `POST /api/auth/forgot-password` - Solicitar restablecimiento de contraseña
- `POST /api/auth/reset-password` - Restablecer contraseña

### Usuarios

- `GET /api/users` - Obtener todos los usuarios (admin)
- `GET /api/users/:id` - Obtener un usuario por ID (admin)
- `POST /api/users` - Crear un nuevo usuario (admin)
- `PUT /api/users/:id` - Actualizar un usuario (admin)
- `DELETE /api/users/:id` - Eliminar un usuario (admin)
- `PUT /api/users/avatar` - Actualizar avatar de usuario
- `DELETE /api/users/me` - Desactivar cuenta de usuario

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `POST /api/products` - Crear un nuevo producto (admin)
- `PUT /api/products/:id` - Actualizar un producto (admin)
- `DELETE /api/products/:id` - Eliminar un producto (admin)
- `GET /api/products/featured` - Obtener productos destacados
- `GET /api/products/category/:categoryId` - Obtener productos por categoría

### Categorías

- `GET /api/categories` - Obtener todas las categorías
- `GET /api/categories/:id` - Obtener una categoría por ID
- `POST /api/categories` - Crear una nueva categoría (admin)
- `PUT /api/categories/:id` - Actualizar una categoría (admin)
- `DELETE /api/categories/:id` - Eliminar una categoría (admin)
- `GET /api/categories/featured` - Obtener categorías destacadas
- `GET /api/categories/:id/subcategories` - Obtener subcategorías

### Pedidos

- `GET /api/orders` - Obtener todos los pedidos (admin)
- `GET /api/orders/my-orders` - Obtener pedidos del usuario actual
- `GET /api/orders/:id` - Obtener un pedido por ID
- `POST /api/orders` - Crear un nuevo pedido
- `PUT /api/orders/:id/status` - Actualizar estado de un pedido (admin)
- `PUT /api/orders/:id/pay` - Actualizar estado de pago de un pedido

### Pagos

- `POST /api/payments/stripe/create-payment-intent` - Crear intento de pago con Stripe
- `POST /api/payments/stripe/webhook` - Webhook para eventos de Stripe
- `GET /api/payments/paypal/config` - Configuración de PayPal
- `POST /api/payments/paypal/webhook` - Webhook para eventos de PayPal

## Licencia

MIT
