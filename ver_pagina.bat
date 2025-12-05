@echo off
title Previsualizacion de Eslabones
echo ==========================================
echo      Iniciando Previsualizacion
echo ==========================================
echo.
echo Iniciando el servidor de desarrollo...
echo Tu navegador deberia abrirse automaticamente.
echo.
echo Si no se abre, visita: http://localhost:3000
echo.

:: Intentar instalar dependencias si no existen (opcional, pero util)
if not exist node_modules (
    echo Instalando dependencias...
    call npm install
)

:: Ejecutar el servidor y abrir el navegador
call npm run dev -- --open

if %errorlevel% neq 0 (
    echo.
    echo Hubo un error al iniciar el servidor.
    pause
)
