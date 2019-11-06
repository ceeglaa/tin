param (
    [string]$pullRequestId = ""
)

Write-Host $pullRequestId
Write-Host $env:tok

#Could not create SSL/TLS secure channel fix 
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;

$Token = 'ceeglaa:913f8ef4097527e3a127e3dd963e875d3989625b'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$Headers = @{
    Authorization = 'Basic  {0}' -f $env:tok;
    Accept = "application/vnd.github.groot-preview+json"
};


#Getting files changed in pull request copy them to the tin-drin/changedFiles file

$UriPullRequest = "https://api.github.com/repos/ceeglaa/tin/pulls/$pullRequestId/files"
$changedFiles = Invoke-RestMethod -Headers $Headers -Uri $UriPullRequest -Method GET
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

#get last commit of current pull reguest 
$uriCommits = "https://api.github.com/repos/ceeglaa/tin/pulls/$pullRequestId/commits"
$changedFiles = Invoke-RestMethod -Headers $Headers -Uri $uriCommits -Method GET 
$changedFiles[$changedFiles.count-1].sha >> commitId.txt