[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
$Token = 'ceeglaa:c32ca7200192e35d3675b5fd832970f54da33c25'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$Headers = @{
    Authorization = 'Basic  {0}' -f $Base64Token
};
$UriCommit = "https://api.github.com/zen"
$urix = " https://api.github.com/ceeglaa/repo"
Invoke-RestMethod Invoke-RestMethod -Uri $UriCommi -Method GET
Invoke-RestMethod Invoke-RestMethod -Headers $Headers -Uri $urix -Method GET