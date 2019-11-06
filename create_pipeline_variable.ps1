$commitId = Get-Content commitId.txt
Write-Host $commitId
Write-Host "##vso[task.setvariable variable=commitId]$commitId"