@echo off
setlocal enabledelayedexpansion

set DEFAULT_IP=127.65.43.22
set HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts

:menu
echo.
echo ================================================
echo         Localhost Port Proxy Manager
echo ================================================
echo.
echo  1. Add proxy
echo  2. Remove proxy
echo  3. List active proxies
echo  4. Exit
echo.
set /p choice=Select an option (1-4): 

if "%choice%"=="1" goto :add
if "%choice%"=="2" goto :remove
if "%choice%"=="3" goto :list
if "%choice%"=="4" goto :eof
goto :menu

:add
echo.
echo === Add Proxy ===
set /p HOST=Enter hostname (e.g. example.test): 
set /p PORT=Enter port to proxy to (e.g. 7465): 
echo Enter IP in the 127.0.0.0/8 range (press Enter to use default: %DEFAULT_IP%)
set /p USER_IP=Custom loopback IP: 
if "%USER_IP%"=="" (
    set BASE_IP=%DEFAULT_IP%
) else (
    set BASE_IP=%USER_IP%
)

echo.
echo Adding to hosts file: %BASE_IP%    %HOST%
echo %BASE_IP%    %HOST%>> "%HOSTS_FILE%"

echo Creating netsh portproxy rule: %BASE_IP%:80 -> 127.0.0.1:%PORT%
netsh interface portproxy add v4tov4 listenport=80 listenaddress=%BASE_IP% connectport=%PORT% connectaddress=127.0.0.1

echo.
echo Proxy added. You can now visit http://%HOST%
pause
goto :menu

:remove
echo.
echo === Remove Proxy ===
set /p HOST=Enter hostname to remove (e.g. example.test): 
set /p PORT=Enter port to remove (e.g. 7465): 
echo Enter IP used when it was added (default: %DEFAULT_IP%)
set /p USER_IP=Custom loopback IP: 
if "%USER_IP%"=="" (
    set BASE_IP=%DEFAULT_IP%
) else (
    set BASE_IP=%USER_IP%
)

echo Unfortunately, you will have to remove the hosts entry %HOST% from %BASE_IP% manually...
echo Removing netsh rule: %BASE_IP%:80
netsh interface portproxy delete v4tov4 listenport=80 listenaddress=%BASE_IP%
echo Proxy removed.
pause
goto :menu

:list
echo.
echo === Active Port Proxies ===
netsh interface portproxy show all
echo.
pause
goto :menu
