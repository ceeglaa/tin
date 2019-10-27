[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
$Username = 'ceeglaa'
$Password = 'Kabaret12'
$Token = '462200dccfc7a386a7781b97b9c6093a01c4bc63'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $Username,$Password)))
$pass = ConvertTo-SecureString -AsPlainText $Password -Force
$Cred = New-Object System.Management.Automation.PSCredential -ArgumentList $Username,$pass

$Headers = @{
    Authorization = 'Basic  {0}' -f $Base64Token; 
};
$Headers2 = @{
    Authorization = 'Basic  {0}' -f $base64AuthInfo;
};
$newBody = @{
    scopes = 'tin', 'ceeglaa';
    note = 'getting-started'
};

$newToekUrl = "https://api.github.com/authorizations"
$UriCommit = "https://api.github.com/zen"
$urix = "https://api.github.com/ceeglaa/repo"
#curl -i -u your_username -d '{"scopes": ["tin", "ceeglaa"], "note": "getting-started"}' https://api.github.com/authorizations
Invoke-WebRequest -Uri $newToekUrl -Body $newBody -Headers $Headers2 -UseBasicParsing
Invoke-WebRequest -Uri $UriCommit -Method GET -UseBasicParsing
#Invoke-WebRequest -Headers $Headers2 -Uri $urix -Method GET