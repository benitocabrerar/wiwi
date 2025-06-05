# TiendaOnline Frontend

Frontend de la aplicación TiendaOnline construido con Next.js, TypeScript y Tailwind CSS.

## Requisitos previos

- Node.js 18.x o superior
- npm o yarn
- Git

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tuorganizacion/tiendaonline-frontend.git
cd tiendaonline-frontend
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```
Editar `.env.local` con tus valores.

## Desarrollo

Iniciar servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

Visitar [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run format` - Formatea el código
- `npm run type-check` - Verifica tipos de TypeScript

## Estructura del proyecto

```
frontend/
├── public/           # Archivos estáticos
│   ├── images/      # Imágenes
│   └── locales/     # Traducciones
├── src/
│   ├── components/  # Componentes React
│   ├── context/     # Contextos de React
│   ├── hooks/       # Custom hooks
│   ├── lib/         # Utilidades y helpers
│   ├── pages/       # Páginas de Next.js
│   ├── styles/      # Estilos globales
│   └── types/       # Definiciones de tipos
└── ...
```

## Tecnologías principales

- [Next.js](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animaciones
- [next-i18next](https://github.com/isaachinman/next-i18next) - Internacionalización

## Convenciones de código

- ESLint para linting
- Prettier para formateo de código
- TypeScript para tipos estáticos
- Componentes funcionales con hooks
- CSS modular con Tailwind CSS
- Traducciones con next-i18next
- Git Flow para control de versiones

## Mejores prácticas

- Escribir test unitarios para componentes
- Mantener componentes pequeños y reutilizables
- Usar tipos TypeScript estrictos
- Seguir principios de accesibilidad (a11y)
- Optimizar rendimiento y SEO
- Documentar componentes y funciones importantes

## Contribuir

1. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
2. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
3. Push a la rama (`git push origin feature/AmazingFeature`)
4. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
