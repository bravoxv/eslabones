@echo off
echo ==========================================
echo      Iniciando Eslabones App
echo ==========================================
echo.
echo Cargando servidor de desarrollo...
echo La aplicacion se abrira automaticamente en tu navegador.
echo.
echo Para cerrar el servidor, cierra esta ventana o presiona Ctrl + C.
echo.

:: Ejecuta npm run dev y pasa el flag --open para abrir el navegador
call npm run dev -- --open

if %errorlevel% neq 0 (
    echo.
    echo Ocurrio un error al iniciar. Asegurate de tener Node.js instalado.
    pause
)
