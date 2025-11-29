@echo off
cd /d "C:\Users\sunit\Desktop\New\DatabaseProject"
echo Starting auto push process...

:loop
git add .
git commit -m "Auto update on %date% %time%"
git push origin master
echo Changes pushed successfully at %time%
timeout /t 300 /nobreak >nul
goto loop
