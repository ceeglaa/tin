$Username = 'ceeglaa'
$Password = 'Kabaret12'
$Token = '462200dccfc7a386a7781b97b9c6093a01c4bc63'
$Base64Token = [System.Convert]::ToBase64String([char[]]$Token);
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $Username,$Password))) >> "testPass.txt"