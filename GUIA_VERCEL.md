# 🚀 Guía Rápida: Cómo Subir a Vercel

## Método 1: Arrastrar y Soltar (MÁS FÁCIL)

### Paso 1: Preparar los archivos
1. Descarga todos los archivos de esta carpeta
2. Asegúrate de mantener la estructura (carpeta `js` incluida)

### Paso 2: Subir a Vercel
1. Ve a: https://vercel.com/new
2. Si no tienes cuenta, créala (es gratis)
3. Verás una pantalla que dice "Import Git Repository"
4. Ignórala y busca la opción **"Deploy without Git"** o arrastra directamente los archivos

### Paso 3: Subir
- Arrastra **TODA LA CARPETA** (no solo los archivos sueltos)
- O selecciona todos los archivos incluyendo la carpeta `js`

### Paso 4: Deploy
1. Vercel detectará automáticamente que es un proyecto HTML estático
2. Click en **"Deploy"**
3. Espera 30-60 segundos

### Paso 5: ¡Listo!
- Te dará una URL como: `tu-proyecto.vercel.app`
- Copia esa URL y compártela con quien quieras
- Cualquiera con el link podrá ver el marketplace

---

## Método 2: Usando GitHub (Más profesional)

### Si quieres tener control de versiones:

1. Crea un repositorio en GitHub
2. Sube todos estos archivos al repo
3. En Vercel, conecta tu cuenta de GitHub
4. Selecciona el repositorio
5. Deploy automático

**Ventaja:** Cada vez que hagas cambios en GitHub, se actualiza automáticamente en Vercel.

---

## ⚠️ Notas Importantes

### Sobre los datos:
- Los datos (productos, categorías, etc.) se guardan en el navegador de cada usuario
- Si editás algo en el Panel Admin en tu computadora, **NO** se verá en otras computadoras
- Para datos compartidos entre todos, necesitarías una base de datos real (eso ya es trabajo para programadores)

### Lo que SÍ se comparte:
- El diseño
- La estructura
- Los productos/categorías que vengan por defecto en `data.js`

### Lo que NO se comparte:
- Los cambios que hagas desde el Panel Admin
- El carrito de compras
- Cualquier edición que hagas en tiempo real

---

## 🎯 Casos de Uso

### Para presentar a clientes:
1. Subí a Vercel
2. Pasales el link
3. Ellos pueden navegar el marketplace
4. Si querés mostrar contenido específico, editá primero localmente, hacé capturas, o subí las imágenes que quieras mostrar

### Para trabajar con desarrolladores:
1. Subilo a Vercel
2. Compartan el link
3. Usalo como referencia visual
4. Los devs pueden ver el código fuente
5. El README.md tiene toda la info que necesitan

---

## 🔄 Actualizar el sitio en Vercel

Si hiciste cambios localmente:

### Método fácil:
1. Borrá el proyecto viejo en Vercel
2. Volvé a subir todo

### Método con Git:
1. Hacé commit de los cambios
2. Push a GitHub
3. Vercel lo actualiza solo

---

## 💡 Tips

- **URLs cortas:** En Vercel podés configurar un dominio personalizado
- **Múltiples versiones:** Podés tener varios proyectos (uno de prueba, uno para mostrar, etc.)
- **Gratis:** El plan gratuito de Vercel es más que suficiente para esto
- **Rápido:** Deploy en segundos, sin configuración

---

## 🆘 Problemas Comunes

**"No se ven los productos"**
→ Abrí el navegador en modo incógnito, los datos se resetean

**"La página sale en blanco"**
→ Asegúrate de haber subido la carpeta `js` también

**"Los estilos no se ven"**
→ Los estilos están embebidos en el HTML, si se ven localmente, se verán en Vercel

**"Cambié algo y no se actualiza"**
→ Limpiá la caché del navegador (Ctrl + Shift + R)

---

## ✅ Checklist antes de subir:

- [ ] Tengo todos los archivos (.html y carpeta js/)
- [ ] Probé que funcione localmente
- [ ] Tengo cuenta en Vercel (o estoy listo para crearla)
- [ ] Sé que los datos del CRM no se compartirán entre usuarios

---

¡Listo! Con esto ya podés tener tu marketplace online en minutos.
