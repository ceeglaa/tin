[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
$UriCommit = "https://api.github.com/zen"
Invoke-RestMethod -Uri $UriCommit -Method GET