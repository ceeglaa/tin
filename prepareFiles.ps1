param (
    [string]$pullRequestId = ""
)


#Could not create SSL/TLS secure channel fix 
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;

$Headers = @{
    Authorization = 'Basic  {0}' -f $env:tok;
    Accept = "application/vnd.github.groot-preview+json"
};

#Getting files changed in pull request copy them to the tin-drin/changedFiles file

$UriPullRequest = "https://api.github.com/repos/ceeglaa/tin/pulls/$pullRequestId/files?per_page=100"
$changedFiles = Invoke-RestMethod -Headers $Headers -Uri $UriPullRequest -Method GET
Invoke-RestMethod -Headers $Headers -Uri $UriPullRequest
$changedFiles >> changed.txt


$changedFiles | foreach {
    $file = $_.filename
    $file >> wszystke.txt
    $patch = $_.patch
    $path = Split-Path -Path $file
    if(Test-Path -Path $_.filename)
    {
        if (!(Test-Path -path "tin-drink/changedFiles/$path")) {New-Item "tin-drink/changedFiles/$path" -Type Directory}
        if (!(Test-Path -path "tin-drink/onlyChanges/$path")) {New-Item "tin-drink/onlyChanges/$path" -Type Directory}
        if (!(Test-Path -path "eslintComments")) {New-Item "eslintComments" -Type Directory}
        Copy-Item -Path $_.filename -Destination "tin-drink/changedFiles/$path"
        $_.patch >> "tin-drink/onlyChanges/$file"
    }
}
function Get-Commit($page) {
    $uriCommits = "https://api.github.com/repos/ceeglaa/tin/pulls/6/commits?page=$page&per_page=100"
    $changedFiles = Invoke-RestMethod -Headers $Headers -Uri $uriCommits -Method GET
    $lastCommitId = $changedFiles[$changedFiles.count-1].sha
   return $lastCommitId
   }

#get last commit of current pull reguest
$lasCommit = Get-Commit(3)
if ($lasCommit) {
    $lasCommit >> commitId.txt
} else {
    $lasCommit = Get-Commit(2)
    if ($lasCommit) {
        $lasCommit >> commitId.txt
    } else {
        $lasCommit = Get-Commit(1)
        Write-Host $lasCommit
        $lasCommit >> commitId.txt
    }
}