@echo off
setlocal enabledelayedexpansion

:: === Variables ===
set "MAVEN_DEPLOY=%CD%\target"
set "USER_DEPLOY=%~1"

:: === Check usage ===
if "%USER_DEPLOY%"=="" (
    echo [ERROR] Usage: %~nx0 ^<userDeployDirectory^>
    exit /b 1
)

set "ARCHIVE_DIR=%USER_DEPLOY%\archived-jars"

:: === Check if user deploy directory exists ===
if not exist "%USER_DEPLOY%" (
    echo [WARN] User deploy directory not found: "%USER_DEPLOY%"
    echo [INFO] Creating directory...
    mkdir "%USER_DEPLOY%" || (
        echo [ERROR] Failed to create directory "%USER_DEPLOY%".
        exit /b 1
    )
)

:: === Create archive dir if needed ===
if not exist "%ARCHIVE_DIR%" (
    echo [INFO] Creating archive directory: "%ARCHIVE_DIR%"
    mkdir "%ARCHIVE_DIR%" || (
        echo [ERROR] Failed to create archive directory "%ARCHIVE_DIR%".
        exit /b 1
    )
)

:: === Create timestamp (YYYYMMDD-HHMMSS) ===
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set dt=%%I
set "STAMP=%dt:~0,8%-%dt:~8,6%"

:: === Archive existing JARs ===
echo [STEP] Archiving existing JARs in "%USER_DEPLOY%"...
set "ARCHIVED=false"
for %%F in ("%USER_DEPLOY%\*.jar") do (
    if exist "%%F" (
        echo     [ARCHIVE] "%%~nxF" -> "%ARCHIVE_DIR%\%STAMP%-%%~nxF"
        move /Y "%%F" "%ARCHIVE_DIR%\%STAMP%-%%~nxF" >nul
        set "ARCHIVED=true"
    )
)
if "!ARCHIVED!"=="false" echo [INFO] No JAR files to archive in "%USER_DEPLOY%".

:: === Deploy new jars from Maven target ===
echo [STEP] Moving new JARs from "%MAVEN_DEPLOY%" to "%USER_DEPLOY%"...
if not exist "%MAVEN_DEPLOY%" (
    echo [WARN] Maven deploy directory not found: "%MAVEN_DEPLOY%"
) else (
    set "MOVED=false"
    for %%F in ("%MAVEN_DEPLOY%\*.jar") do (
        if exist "%%F" (
            echo     [DEPLOY] "%%~nxF" -> "%USER_DEPLOY%\"
            move /Y "%%F" "%USER_DEPLOY%\" >nul
            set "MOVED=true"
        )
    )
    if "!MOVED!"=="false" (
        echo [WARN] No JAR files found in "%MAVEN_DEPLOY%".
    ) else (
        echo [SUCCESS] Deployment finished.
    )
)

endlocal
exit /b 0
