# Guía de Contribución

¡Gracias por tu interés en contribuir a WiWi! Este documento proporciona las pautas para contribuir al proyecto.

## 🌟 Cómo Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📝 Convenciones de Código

### General
- Usar TypeScript para todo el código nuevo
- Seguir las reglas de ESLint y Prettier configuradas
- Mantener la consistencia con el código existente

### Frontend
- Componentes funcionales con hooks
- Props tipadas explícitamente
- Estilos con Tailwind CSS
- Traducciones con next-i18next
- Tests para componentes críticos

### Backend
- Arquitectura MVC
- Validación de datos con Joi
- Documentación de API con Swagger
- Tests unitarios con Jest

## 🏗️ Estructura del Proyecto

```
wiwi/
├── frontend/         # Aplicación Next.js
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   └── public/
└── backend/          # API Node.js
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── utils/
    └── tests/
```

## ✅ Checklist para Pull Requests

- [ ] Código sigue las guías de estilo
- [ ] Tests añadidos/actualizados
- [ ] Documentación actualizada
- [ ] Traducciones actualizadas (si aplica)
- [ ] Revisión de seguridad realizada
- [ ] Performance verificada
- [ ] Cambios probados localmente

## 🐛 Reportar Bugs

1. Verifica que el bug no esté ya reportado
2. Usa la plantilla de issues para bugs
3. Proporciona:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Información del entorno

## 💡 Proponer Features

1. Discute la idea en issues primero
2. Usa la plantilla de propuesta de feature
3. Explica:
   - El problema que resuelve
   - La solución propuesta
   - Alternativas consideradas
   - Impacto en usuarios/desarrollo

## 🚀 Pull Request Process

1. Actualiza el README.md si es necesario
2. Actualiza la documentación relacionada
3. Merge solo después de:
   - CI/CD verde
   - Code review aprobado
   - Documentación actualizada
   - Tests pasando

## 📝 Commit Messages

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Resumen en presente
|
+-------> Tipo: feat, fix, docs, style, refactor, test, chore
```

## 🤝 Código de Conducta

- Sé respetuoso y constructivo
- Acepta críticas constructivas
- Enfócate en lo mejor para la comunidad
- Muestra empatía hacia otros miembros

## ❓ ¿Preguntas?

Contacta al equipo:
- Email: benitocabrerar@gmail.com
- GitHub: [@benitocabrerar](https://github.com/benitocabrerar)
