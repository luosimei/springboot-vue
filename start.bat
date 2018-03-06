@echo off
echo "project path:" %cd%
cd %~dp0
call npm run dev
pause