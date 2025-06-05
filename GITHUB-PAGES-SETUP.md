# Configuración de GitHub Pages

Tu sitio web se desplegará automáticamente usando GitHub Actions. Aquí están los pasos finales:

## Pasos para habilitar GitHub Pages:

1. Ve a tu repositorio en GitHub: https://github.com/benitocabrerar/wiwi
2. Haz clic en **Settings** (Configuración) en la parte superior del repositorio
3. Desplázate hacia abajo hasta la sección **Pages** en el menú lateral izquierdo
4. En **Source**, selecciona **Deploy from a branch**
5. En **Branch**, selecciona **gh-pages** (aparecerá después del primer despliegue)
6. Deja **/ (root)** seleccionado
7. Haz clic en **Save**

## ¿Qué sucederá después?

- ✅ El workflow de GitHub Actions se ejecutará automáticamente (ya está configurado)
- ✅ Creará una nueva rama `gh-pages` con los archivos estáticos
- ✅ GitHub Pages servirá el sitio desde esa rama
- ✅ El proceso toma unos 2-3 minutos

## Verificar el despliegue:

1. Ve a la pestaña **Actions** en tu repositorio: https://github.com/benitocabrerar/wiwi/actions
2. Verifica que el workflow "Deploy to GitHub Pages" se complete con ✅
3. Ve a **Settings > Pages** y selecciona la rama **gh-pages**
4. Tu sitio estará disponible en: **https://benitocabrerar.github.io/wiwi/**

## Estado actual:
- ✅ Configuración de Next.js completada
- ✅ GitHub Actions configurado
- ✅ Workflow actualizado para usar gh-pages
- ⏳ Esperando que habilites GitHub Pages en configuración

## Funcionalidades del sitio:

- ✅ Página principal con diseño responsivo
- ✅ Navegación completa
- ✅ Secciones de productos destacados
- ✅ Testimonios
- ✅ Newsletter
- ✅ Footer completo
- ✅ Tema oscuro/claro
- ✅ Optimizado para móviles

¡Una vez que habilites GitHub Pages, tu sitio estará funcionando en línea!
