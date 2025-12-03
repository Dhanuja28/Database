@echo off
cd /d "%~dp0"

echo Starting Backend Server...
start "" cmd /c "node server.js"

timeout /t 2 > nul

echo Opening Frontend...
start http://localhost:5000

exit
