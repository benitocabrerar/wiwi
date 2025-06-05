# WIWI E-commerce Platform

WIWI es una plataforma de comercio electrónico moderna y escalable, diseñada inicialmente para Ecuador con capacidad de expansión global. Esta aplicación permite a los usuarios comprar productos en línea, realizar pagos y hacer seguimiento de sus pedidos hasta la entrega.

## Características Principales

### Para Clientes
- Catálogo de productos con búsqueda y filtrado avanzado
- Sistema de carrito de compras
- Proceso de pago seguro con múltiples métodos
- Seguimiento de pedidos en tiempo real
- Sistema de reseñas y calificaciones
- Programa de lealtad con puntos y beneficios
- Soporte para múltiples idiomas
- Modo oscuro/claro

### Para Administradores
- Panel de administración completo
- Gestión de productos y categorías
- Gestión de inventario
- Procesamiento de pedidos
- Análisis de ventas y reportes
- Gestión de usuarios y permisos
- Configuración de promociones y descuentos
- Herramientas de marketing (boletines, cupones)

## Tecnologías Utilizadas

### Frontend
- Next.js (React)
- TypeScript
- Tailwind CSS
- React Query
- Next-i18next para internacionalización
- React Icons
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- Socket.io para actualizaciones en tiempo real
- Multer para carga de archivos
- Nodemailer para envío de correos

## Estructura del Proyecto

```
/
├── frontend/                # Aplicación Next.js
│   ├── public/              # Archivos estáticos
│   ├── src/                 # Código fuente
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas de Next.js
│   │   ├── styles/          # Estilos CSS
│   │   ├── hooks/           # Custom hooks
│   │   ├── context/         # Contextos de React
│   │   ├── utils/           # Utilidades
│   │   └── types/           # Definiciones de TypeScript
│   ├── next.config.js       # Configuración de Next.js
│   └── tailwind.config.js   # Configuración de Tailwind CSS
│
└── backend/                 # API de Node.js
    ├── src/                 # Código fuente
    │   ├── controllers/     # Controladores
    │   ├── models/          # Modelos de Mongoose
    │   ├── routes/          # Rutas de Express
    │   ├── middleware/      # Middleware
    │   ├── utils/           # Utilidades
    │   └── config/          # Configuración
    └── .env.example         # Variables de entorno de ejemplo
```

## Instalación y Ejecución

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB
- npm o yarn

### Configuración del Backend
1. Navega al directorio del backend:
   ```
   cd backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` basado en `.env.example` y configura tus variables de entorno.

4. Inicia el servidor:
   ```
   npm run dev
   ```

### Configuración del Frontend
1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env.local` basado en `.env.example` y configura tus variables de entorno.

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Características Adicionales

### Sistema de Pagos
- Integración con múltiples pasarelas de pago
- Soporte para tarjetas de crédito, transferencias bancarias y pago contra entrega
- Facturación electrónica

### Envíos
- Cálculo de costos de envío en tiempo real
- Integración con servicios de mensajería
- Seguimiento de paquetes

### Marketing
- SEO optimizado
- Integración con redes sociales
- Sistema de cupones y promociones
- Boletines por correo electrónico

### Seguridad
- Autenticación JWT
- Protección CSRF
- Encriptación de datos sensibles
- Rate limiting para prevenir ataques

## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
