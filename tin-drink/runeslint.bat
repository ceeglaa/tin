eslint .\changedFiles\**\*.js -o ..\eslint.json -f json
if errorlevel 0 (
   echo Failure Reason Given is %errorlevel%
   exit /b %errorlevel%
)