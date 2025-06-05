# Pasos para publicar el proyecto completo

Ejecuta estos comandos desde la raíz del proyecto:

1. Añadir todos los archivos:
```bash
git add .
```

2. Crear el commit inicial:
```bash
git commit -m "Initial commit: Frontend and Backend setup"
```

3. Cambiar a la rama main:
```bash
git branch -M main
```

4. Agregar el repositorio remoto:
```bash
git remote add origin https://github.com/benitocabrerar/wiwi.git
```

5. Subir los cambios:
```bash
git push -u origin main
```

Al ejecutar estos comandos:
- Para el commit, se te abrirá un editor si no tienes configurado tu nombre y email en git. En ese caso, primero ejecuta:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "benitocabrerar@gmail.com"
```

Ejecuta los comandos uno por uno y avísame después de cada paso si ves algún error o necesitas ayuda.
