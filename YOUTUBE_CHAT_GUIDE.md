# Integración de Chat en Vivo de YouTube

## ¿Qué necesitas?

Para ver el chat en vivo de YouTube en tu aplicación, necesitas el **ID del video en vivo**.

## Cómo obtener el ID del video

### Método 1: Desde la URL del video

1. **Inicia tu transmisión en vivo** en YouTube
2. **Ve a tu transmisión** y copia la URL
3. La URL se verá así:
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```
4. El **ID del video** es la parte después de `v=`:
   ```
   dQw4w9WgXcQ
   ```

### Método 2: Desde YouTube Studio

1. Ve a [YouTube Studio](https://studio.youtube.com)
2. Haz clic en **"Transmitir en vivo"** en el menú lateral
3. En la sección de transmisión, encontrarás la **URL de transmisión**
4. Copia solo el ID del video (la parte después de `v=`)

## Formatos de URL válidos

La aplicación acepta estos formatos:

- URL completa: `https://www.youtube.com/watch?v=VIDEO_ID`
- URL corta: `https://youtu.be/VIDEO_ID`
- Solo el ID: `VIDEO_ID`

## Configuración en la aplicación

1. **Abre Configuraciones** haciendo clic en el ícono de engranaje (⚙️) en la barra de navegación
2. **Busca la sección** "Chat en Vivo de YouTube"
3. **Pega el ID del video** en el campo de entrada
4. El ID se guardará automáticamente

## Uso del chat

1. **Haz clic en cualquier tarjeta** de miembro
2. **Haz clic en "Ver Chat en Vivo"**
3. **Selecciona la pestaña "YouTube"**
4. El chat en vivo aparecerá automáticamente

## Notas importantes

- ⚠️ El chat solo funcionará si tu transmisión está **activa**
- 🔄 El ID del video cambia con cada nueva transmisión
- 💾 El ID se guarda en tu navegador (localStorage)
- 🌐 El chat se carga directamente desde YouTube usando un iframe

## Solución de problemas

### El chat no aparece
- Verifica que el ID del video sea correcto
- Asegúrate de que tu transmisión esté activa
- Comprueba que el chat esté habilitado en tu transmisión

### El chat muestra un error
- El video puede haber terminado
- El ID puede ser incorrecto
- La transmisión puede estar configurada como privada

### Necesito cambiar el ID
- Simplemente abre Configuraciones nuevamente
- Ingresa el nuevo ID del video
- El cambio se aplicará inmediatamente

## Ejemplo completo

```
URL de tu transmisión:
https://www.youtube.com/watch?v=abc123XYZ

ID a copiar:
abc123XYZ
```

## Privacidad

- El ID del video se almacena **solo en tu navegador**
- No se envía a ningún servidor externo
- Puedes borrarlo en cualquier momento desde Configuraciones
