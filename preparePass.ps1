$Username = 'ceeglaa'
$Password = 'Kabaret12'
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $Username,$Password))) >> "newpas.txt"