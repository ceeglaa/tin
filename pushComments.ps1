param (
    [string]$pullNumber = ""
)
#Could not create SSL/TLS secure channel fix
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;

$Token = 'ceeglaa:b86e5cd94d89a8db758a2a6c6fc717763036b63b'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$Headers = @{
    Authorization = 'Basic  {0}' -f $Base64Token;
    Accept = "application/vnd.github.comfort-fade-preview+json"
};


$url = "https://api.github.com/repos/ceeglaa/tin/pulls/$pullNumber/comments"

Get-ChildItem "eslintComments" -Filter *.json |
    Foreach-Object {
        $badContent = Get-Content $_.FullName
        $data =  Get-Content $_.FullName | ConvertFrom-Json
        $path = $data.path
        $lineContent = (Get-Content -Path $data.path -TotalCount $data.line)[-1]
        $lineWithPlus = [regex]::escape('+' + $lineContent)
        $content = $badContent -replace [regex]::escape('\\'), [regex]::escape('/')
        If (Select-String -Path "tin-drink/onlyChanges/$path" -Pattern $lineWithPlus) 
        {
           Invoke-RestMethod -Headers $Headers -Uri $url -Body $content -Method POST
        }   
    }