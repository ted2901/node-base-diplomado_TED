# 📦 Comandos Git - Referencia Rápida

## 🔧 Configuración inicial (solo una vez)

```bash
# Configurar tu identidad en Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar configuración
git config --list
```

---

## 📋 Flujo de trabajo diario

```bash
# 1. Ver el estado de tus archivos modificados
git status

# 2. Ver los cambios específicos realizados
git diff

# 3. Agregar archivos al área de staging
git add .                  # Agrega TODOS los cambios
git add nombre-archivo.js  # Agrega un archivo específico

# 4. Crear un commit con mensaje descriptivo
git commit -m "feat: descripción de los cambios"

# 5. Subir los cambios a GitHub
git push origin main       # o 'master' según tu rama principal
```

---

## 🌿 Manejo de ramas (branches)

```bash
# Ver ramas existentes
git branch

# Crear y cambiar a nueva rama
git checkout -b nombre-rama

# Cambiar entre ramas
git checkout main

# Fusionar rama al main
git merge nombre-rama
```

---

## ⬇️ Obtener cambios remotos

```bash
# Descargar cambios sin aplicar
git fetch origin

# Descargar Y aplicar cambios del remoto
git pull origin main
```

---

## 🔍 Historial y revisión

```bash
# Ver historial de commits
git log --oneline

# Ver quién modificó cada línea de un archivo
git blame nombre-archivo.js

# Deshacer cambios NO commiteados de un archivo
git checkout -- nombre-archivo.js

# Revertir el último commit (sin perder cambios)
git reset --soft HEAD~1
```

---

## 🔁 Flujo típico resumido

```bash
git status
git add .
git commit -m "descripción del cambio"
git push origin main
```

> ⚠️ El archivo `.env` **nunca se sube a GitHub** porque está en `.gitignore` — protege tus contraseñas.
