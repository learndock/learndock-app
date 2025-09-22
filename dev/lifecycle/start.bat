@echo off

REM Define server file here
set AppName=learndock

REM Define ram alocation amount here you can use G for Gigabytes or M for Megabytes
REM Maximum memory allocation pool
set MaxRam=8G
REM Initial memory allocation pool
set IniRam=2G

set "ServerFileName="
set "HighestVersion="

for %%f in ("%AppName%-*.jar") do (
    call :GetVersion "%%f" CurrentVersion
    if defined CurrentVersion (
        if not defined HighestVersion (
            set "HighestVersion=!CurrentVersion!"
            set "ServerFileName=%%f"
        ) else (
            call :CompareVersions "!CurrentVersion!" "!HighestVersion!" Result
            if "!Result!"=="Newer" (
                set "HighestVersion=!CurrentVersion!"
                set "ServerFileName=%%f"
            )
        )
    )
)

if not defined ServerFileName (
    echo Error: No '%AppName%-*.jar' file found! Please make sure the server JAR is in the same directory.
    pause
    exit /b
)

echo Found server file: %ServerFileName%

title Server-Console (%ServerFileName%)

echo.
echo ....................................
echo Starting %ServerFileName% server
echo Maximum memory: %MaxRam%
echo Initial memory: %IniRam%
echo ....................................
timeout 5

set Ram=-Xmx%MaxRam% -Xms%IniRam%

:Start
cls

java %Ram% -jar %ServerFileName%

echo.
echo Server has closed or crashed...
echo.
echo The Server will restart after the timeout. Close console window to stop server now!
timeout 15
goto Start

:GetVersion
    setlocal enabledelayedexpansion
    set "filename=%~1"
    for /f "tokens=2 delims=-." %%a in ("%filename%") do (
        set "version=%%a"
    )
    endlocal & set "%2=%version%"
    goto :eof

:CompareVersions
    setlocal enabledelayedexpansion
    set "version1=%~1"
    set "version2=%~2"
    set "result=Older"

    REM Split versions into components
    for /f "tokens=1-3 delims=." %%a in ("%version1%") do (
        set "v1_major=%%a"
        set "v1_minor=%%b"
        set "v1_patch=%%c"
    )
    for /f "tokens=1-3 delims=." %%a in ("%version2%") do (
        set "v2_major=%%a"
        set "v2_minor=%%b"
        set "v2_patch=%%c"
    )

    REM Compare major version
    if !v1_major! GTR !v2_major! set "result=Newer" & goto :compare_end
    if !v1_major! LSS !v2_major! set "result=Older" & goto :compare_end

    REM Compare minor version
    if !v1_minor! GTR !v2_minor! set "result=Newer" & goto :compare_end
    if !v1_minor! LSS !v2_minor! set "result=Older" & goto :compare_end

    REM Compare patch version
    if !v1_patch! GTR !v2_patch! set "result=Newer" & goto :compare_end
    if !v1_patch! LSS !v2_patch! set "result=Older" & goto :compare_end
    
    REM If all parts are equal, they are the same version or current is not newer
    set "result=Same"

:compare_end
    endlocal & set "%3=%result%"
    goto :eof