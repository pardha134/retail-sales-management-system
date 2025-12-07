@echo off
echo Checking Retail Sales Management System Status...
echo.
echo Checking Backend (Port 5000)...
curl -s http://localhost:5000/health 2>nul
if %errorlevel% equ 0 (
    echo [OK] Backend is running
) else (
    echo [ERROR] Backend is not running
)
echo.
echo Checking Frontend (Port 5173)...
curl -s http://localhost:5173 2>nul >nul
if %errorlevel% equ 0 (
    echo [OK] Frontend is running
) else (
    echo [ERROR] Frontend is not running
)
echo.
echo.
echo If servers are not running, use start-all.bat to start them.
echo.
pause
