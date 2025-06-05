# Comandos para publicar en GitHub

Ejecuta estos comandos en orden desde la terminal, estando en la carpeta `frontend` del proyecto:

```bash
# 1. Inicializar git si no está inicializado
git init

# 2. Verificar el estado de los archivos
git status

# 3. Agregar todos los archivos al staging
git add .

# 4. Crear el commit inicial
git commit -m "Initial commit"

# 5. Agregar el repositorio remoto
git remote add origin https://github.com/benitocabrerar/wiwi.git

# 6. Cambiar a la rama main si no estás en ella
git branch -M main

# 7. Subir los cambios al repositorio
git push -u origin main
```

Cuando ejecutes el último comando (`git push`), Git te pedirá tus credenciales de GitHub.
Ingresa tu usuario y contraseña cuando te lo solicite.

Si recibes un error de autenticación, asegúrate de:
1. Que las credenciales sean correctas
2. Que tengas permisos en el repositorio
3. Que el repositorio exista en GitHub

Para verificar que todo está correcto:
```bash
# Verificar el remoto configurado
git remote -v

# Verificar el estado del repositorio
git status

# Ver los commits
git log --oneline
```

Nota: Si recibes el error "Support for password authentication was removed", necesitarás usar un token de acceso personal (PAT) en lugar de tu contraseña. En ese caso, avísame para guiarte en la generación del token.
