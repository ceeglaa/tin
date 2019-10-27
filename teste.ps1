[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
$Token = 'ceeglaa:a69a23495083163b47ebedfe6e5f0b907eb7fc12'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$Headers = @{
    Authorization = 'Basic  {0}' -f $Base64Token; 
    User-Agent =  'ceeglaa'
};
$UriCommit = "https://api.github.com/zen"
$urix = "https://api.github.com/ceeglaa/repo"
Invoke-RestMethod -Headers $Headers -Uri $UriCommit -Method GET
Invoke-RestMethod -Headers $Headers -Uri $urix -Method GET