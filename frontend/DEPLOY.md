# Instrucciones para publicar el proyecto

1. Primero, inicia sesión en GitHub desde tu navegador

2. Crea un nuevo repositorio en GitHub:
   - Ve a https://github.com/new
   - Nombre del repositorio: wiwi
   - Descripción: Frontend de la tienda online WiWi
   - Selecciona "Public"
   - No inicialices el repositorio con ningún archivo

3. Desde tu terminal local, ejecuta:
```bash
# Inicializar git en el proyecto
git init

# Añadir todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit"

# Añadir el remoto (reemplaza USERNAME con tu nombre de usuario)
git remote add origin https://github.com/benitocabrerar/wiwi.git

# Subir los cambios
git push -u origin main
```

4. Si usas GitHub CLI, puedes simplemente ejecutar:
```bash
gh repo create wiwi --public --source=. --push
```

**Importante**: Nunca compartas tus credenciales de GitHub. En su lugar:
- Usa tokens de acceso personal (PAT) para operaciones automatizadas
- Configura la autenticación SSH para operaciones desde tu máquina
- Usa GitHub CLI que maneja la autenticación de forma segura
