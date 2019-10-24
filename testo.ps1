Get-ChildItem 'tst.json' | 
Foreach-Object {

    $content = Get-Content $_.FullName
    $tst = $content | ConvertTo-Json
    Write-Host $content
    curl -i -u ceeglaa -d $content https://api.github.com/repos/ceeglaa/tin/pulls/6/comments
    }
