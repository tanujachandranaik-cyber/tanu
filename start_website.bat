@echo off
title Starting Tanuja M C Portfolio
color 0b
echo ============================================================
echo   Starting Tanuja M C Portfolio Website (Full CSS & JS)
echo ============================================================
echo.
cd /d "%~dp0"

:: Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python detected! Starting development server...
    echo Website will automatically open in your browser at:
    echo http://localhost:8080/
    echo.
    echo (Keep this window open while browsing. Close to stop server)
    echo.
    python server.py
) else (
    echo Python was not found in PATH.
    echo Opening index.html directly in your default browser...
    start "" "%~dp0index.html"
)

pause
