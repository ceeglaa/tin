[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
$Username = 'ceeglaa'
$Password = 'Kabaret12'
$Token = '462200dccfc7a386a7781b97b9c6093a01c4bc63'
$badContent = Get-Content "testPass.txt"
Write-Host $badContent
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $Username,$Password)))
Write-Host $env:TOKEN
Write-Host $env:TOK
$pass = ConvertTo-SecureString -AsPlainText $Password -Force
$Cred = New-Object System.Management.Automation.PSCredential -ArgumentList $Username,$pass

$Headers = @{
    Authorization = 'Basic  {0}' -f $env:TOK; 
};
$Headers2 = @{
    Authorization = 'Basic  {0}' -f $env:TOKEN;
};
$newBody = @{
    scopes = 'tin', 'ceeglaa';
    note = 'getting-started'
};

$newToekUrl = "https://api.github.com/authorizations"
$UriCommit = "https://api.github.com/zen"
Invoke-WebRequest -Uri $newToekUrl -Body $newBody -Headers $Headers -UseBasicParsing