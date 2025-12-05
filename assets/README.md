# Assets Directory

Este directorio contiene todos los assets (imágenes, logos, etc.) utilizados en la aplicación.

## Estructura

```
assets/
├── images/          # Imágenes de perfiles y contenido
│   └── README.md   # Documentación de imágenes
├── logos/          # Logos e iconos de alta calidad
│   └── README.md   # Documentación de logos
```

## Imágenes

Las imágenes de los miembros se encuentran actualmente alojadas en servicios externos (Imgur, Postimg). Para mejorar la calidad y el rendimiento, se recomienda:

1. Descargar las imágenes originales de alta calidad
2. Optimizarlas usando herramientas como:
   - **ImageOptim** (Mac)
   - **TinyPNG** (Web)
   - **Sharp** (Node.js)
3. Guardarlas en `assets/images/` con nombres descriptivos
4. Actualizar las rutas en `constants.ts`

### Mejoras de Calidad Recomendadas

- **Formato**: WebP para mejor compresión y calidad
- **Tamaño**: Mínimo 800x800px para tarjetas de miembros
- **Optimización**: Compresión sin pérdida cuando sea posible

## Logos

Los logos de redes sociales han sido mejorados con:
- Mayor tamaño (32x32 en lugar de 24x24)
- Gradientes mejorados
- Mejor calidad visual

### Logo de Discord
El logo de Discord ha sido actualizado con:
- Tamaño aumentado a 32x32px
- Gradiente de color (#7289da a #5865f2)
- Mejor detalle y definición

## Uso

Para usar un asset en tu componente:

```tsx
import imagePath from '../assets/images/member-name.webp';

// En tu JSX
<img src={imagePath} alt="Member name" />
```

## Notas

- Mantén los nombres de archivo descriptivos y en minúsculas
- Usa guiones (-) en lugar de espacios
- Documenta cualquier asset especial o con requisitos específicos
