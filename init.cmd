@echo off

setlocal
call :setESC

if not exist node_modules (
    echo %ESC%[33mInstalling Project Dependencies...%ESC%[0m
    npm install
    echo %ESC%[32mProject Dependencies Installed!%ESC%[0m

    start http://localhost:5173
    npm run dev
) else (
    echo %ESC%[33mUpdating Project Dependencies...%ESC%[0m
      npm install
    echo %ESC%[32mProject Dependencies Updated!%ESC%[0m

    start http://localhost:5173
    npm run dev
)

:setESC
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set ESC=%%b
  exit /B 0
)