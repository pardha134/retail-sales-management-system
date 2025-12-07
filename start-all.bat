@echo off
echo Starting Retail Sales Management System...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && node src/index.js"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
