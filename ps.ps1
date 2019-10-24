param (
    [string]$commitId = ""
)

$Token = 'ceeglaa:b86e5cd94d89a8db758a2a6c6fc717763036b63b'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$Headers = @{
    Authorization = 'Basic  {0}' -f $Base64Token;
    Accept = "application/vnd.github.groot-preview+json"
};

$Uri = "https://api.github.com/repos/ceeglaa/tin/commits/$commitId/pulls"


#Getting Pull request with commit_id
    $pullRequests = Invoke-RestMethod -Headers $Headers -Uri $Uri -Method GET
    $pullRequestsJson = $pullRequests | ConvertTo-Json
    Write-Host $pullRequests[0].url

#Getting files changed in pull request
$test = Invoke-RestMethod -Headers $Headers -Uri https://api.github.com/repos/ceeglaa/tin/pulls/6/files

if ($pullRequests) { Write-Host "variable is NOT null" 
#Write-Host $test.GetType()
$json = $test | ConvertTo-Json
#Write-Host "variable is NOT null" 
#Write-Host $json
}






