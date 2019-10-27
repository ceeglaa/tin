param (
    [string]$commitId = ""
)
#Could not create SSL/TLS secure channel fix 
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;

$Token = 'ceeglaa:913f8ef4097527e3a127e3dd963e875d3989625b'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$Headers = @{
    Authorization = 'Basic  {0}' -f $env:TOK;
    Accept = "application/vnd.github.groot-preview+json"
};

#Getting Pull request with commit_id
$UriCommit = "https://api.github.com/repos/ceeglaa/tin/commits/$commitId/pulls"
$pullRequests = Invoke-RestMethod -Headers $Headers -Uri $UriCommit -Method GET
$openpr = $pullRequests | where { $_.base.ref -eq "develop" -and $_.state -eq "open"} 
$pullRequestId = $openpr.number

Write-Host $pullRequestId
Write-Host $commitId

#Create folder
if (!(Test-Path -path "tin-drink/onlyChanges/$path")) {New-Item "tin-drink/onlyChanges/$path" -Type Directory}

#Getting files changed in pull request save them into .txt file

$UriPullRequest = "https://api.github.com/repos/ceeglaa/tin/pulls/$pullRequestId/files"
$changedFiles = Invoke-RestMethod -Headers $Headers -Uri $UriPullRequest
Invoke-RestMethod -Headers $Headers -Uri $UriPullRequest

$changedFiles | foreach {
    $file = $_.filename
    $patch = $_.patch
    $path = Split-Path -Path $file
    if(Test-Path -Path $_.filename)
    {
        if (!(Test-Path -path "tin-drink/changedFiles/$path")) {New-Item "tin-drink/changedFiles/$path" -Type Directory}
        if (!(Test-Path -path "tin-drink/onlyChanges/$path")) {New-Item "tin-drink/onlyChanges/$path" -Type Directory}
        Write-Host $file
        Copy-Item -Path $_.filename -Destination "tin-drink/changedFiles/$path"
        $_.patch >> "tin-drink/onlyChanges/$file"
    }
}