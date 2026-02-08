# 🚀 TechMarket - Marketplace de Tecnología

## 📋 ¿Qué es esto?

Este es un **marketplace completamente funcional** de tecnología con un **panel de administración (CRM)** incluido. Está diseñado para que puedas usarlo como prototipo interactivo cuando trabajes con programadores y sistemas.

## ✨ Características principales

### Frontend (Lo que ven los usuarios)
- ✅ **Home** con banners rotatorios editables
- ✅ **Categorías** organizadas visualmente
- ✅ **Secciones dinámicas** (Ofertas, Novedades, Más vendidos)
- ✅ **Páginas de categoría** con filtrado
- ✅ **Páginas de producto** individuales
- ✅ Diseño responsivo (funciona en móvil y desktop)

### Panel de Administración (CRM)
- ✅ **Gestión de productos** (crear, editar, eliminar)
- ✅ **Gestión de categorías** con íconos personalizables
- ✅ **Gestión de banners** del home
- ✅ **Gestión de secciones** del home (agregar/quitar bloques)
- ✅ Dashboard con estadísticas
- ✅ Todos los datos se guardan automáticamente

## 🎯 Cómo usar

### Opción 1: Abrir directamente en tu navegador
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador (Chrome, Firefox, Safari, Edge)
3. ¡Listo! Ya funciona

### Opción 2: Subir a Vercel (para compartir con tu equipo)

#### Paso a paso:
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta
3. Click en "Add New..." → "Project"
4. Arrastra todos los archivos de esta carpeta
5. Click en "Deploy"
6. En 30 segundos tendrás una URL como: `tu-proyecto.vercel.app`

**Ventaja:** Cualquiera con el link puede ver el marketplace y el CRM funcionando.

## 📁 Estructura de archivos

```
/
├── index.html          → Página principal (home)
├── admin.html          → Panel de administración (CRM)
├── category.html       → Página de categoría
├── product.html        → Página de producto individual
└── js/
    ├── data.js         → Sistema de datos (localStorage)
    ├── home.js         → Lógica del home
    └── admin.js        → Lógica del panel admin
```

## 🔧 Acceso al Panel de Administración

Desde cualquier página, puedes acceder al panel haciendo click en el botón naranja **"Panel Admin"** en el header.

O directamente abriendo: `admin.html`

## 💾 ¿Dónde se guardan los datos?

Los datos se guardan en el **localStorage** de tu navegador. Esto significa:
- ✅ Persisten aunque cierres el navegador
- ✅ No necesitas base de datos
- ⚠️ Son locales a tu computadora/navegador
- ⚠️ Si borras los datos del navegador, se pierden

**Para compartir datos con tu equipo:** Sube a Vercel y todos verán el mismo contenido inicial. Cada usuario tendrá su propia copia en su navegador.

## 🎨 Personalización desde el CRM

### Productos
- Agrega productos con: nombre, precio, precio anterior, categoría, imagen
- Marca productos como "destacados" para que aparezcan en la sección principal
- Los descuentos se calculan automáticamente

### Categorías  
- Crea categorías con nombre e ícono (emoji)
- Aparecen automáticamente en el home y en la navegación

### Banners
- Agrega banners promocionales con título, subtítulo e imagen
- Activa/desactiva banners sin eliminarlos
- Los banners rotan automáticamente cada 5 segundos

### Secciones del Home
- Agrega bloques de productos al home
- Tipos: Destacados, Novedades, Más vendidos, o por categoría específica
- Activa/desactiva secciones sin borrarlas
- El orden de las secciones se define automáticamente

## 📸 Imágenes

Para las imágenes de productos y banners, usa URLs de imágenes online:
- **Unsplash:** https://unsplash.com (fotos gratis)
- **Pexels:** https://pexels.com (fotos gratis)
- **Imgur:** Sube tus propias imágenes y usa el link

**Ejemplo de URL válida:**
```
https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400
```

## 🔄 Próximos pasos (cuando trabajes con desarrolladores)

Este prototipo es perfecto para mostrar:
1. **Flujos de usuario:** Cómo navegan los usuarios
2. **Estructura de datos:** Qué campos necesitan los productos
3. **Funcionalidades del CRM:** Qué necesitan poder editar
4. **Diseño visual:** Cómo se ve todo

Los desarrolladores podrán:
- Convertir esto a un backend real (Node.js, PHP, Python, etc.)
- Migrar a una base de datos real (PostgreSQL, MySQL, MongoDB)
- Agregar autenticación de usuarios
- Implementar pagos reales
- Optimizar para producción

## 🆘 Soporte

Si algo no funciona:
1. Asegúrate de abrir `index.html` (no los archivos `.js`)
2. Abre la consola del navegador (F12) para ver errores
3. Los datos se guardan por sitio, si cambias de carpeta se resetean

## 📝 Notas importantes

- **No uses esto en producción directamente** - Es un prototipo
- **Los datos son locales** - Cada navegador tiene su propia copia
- **Sin autenticación** - Cualquiera puede acceder al panel admin
- **Sin validaciones avanzadas** - Los desarrolladores agregarán esto

## 🎉 ¡Listo!

Ahora tienes un marketplace completamente funcional para usar en tus presentaciones y como referencia para el equipo de desarrollo.

¿Necesitas agregar algo más o cambiar algo? Podés editarlo desde el panel admin o pedirme que lo modifique.
