set /p Build=<tst.json
echo %Build%
curl -i -H "Authorization: token 7e416474254c71b3a880931c5147f4b4c3017a85" -d %Build%  https://api.github.com/repos/ceeglaa/tin/pulls/6/comments