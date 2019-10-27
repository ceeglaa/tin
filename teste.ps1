[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
$Token = 'ceeglaa:d72edc892d8f0e74103b0e42dc221d9107d046e9'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$Headers = @{
    Authorization = 'Basic  {0}' -f $Base64Token; 
};
$UriCommit = "https://api.github.com/zen"
$urix = "https://api.github.com/ceeglaa/repo"
Invoke-RestMethod -Headers $Headers -Uri $UriCommit -Method GET
Invoke-RestMethod -Headers $Headers -Uri $urix -Method GET