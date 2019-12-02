const http = require('http');
const querystring = require('querystring');
const url = require('url');
const functions = require('./utils');

//create a server object

function runServer() {
    http.createServer((req, res) => {
        if (req.url !== '/favicon.ico'){
            let parsedUrl = url.parse(req.url);
            let queryParam = querystring.parse(parsedUrl.query);
            console.log(parsedUrl);

            if(parsedUrl.pathname === '/add') {
                let tst = functions.add(queryParam.firstNumber, queryParam.secondNumber);
                res.write(tst);
                res.end();
            } else if(parsedUrl.pathname === '/mul') {
                let tst = functions.mul(queryParam.firstNumber, queryParam.secondNumber);
                res.write(tst);
                res.end();
            } else if(parsedUrl.pathname === '/sub') {
                let tst = functions.sub(queryParam.firstNumber, queryParam.secondNumber);
                res.write(tst);
                res.end();
            } else if(parsedUrl.pathname === '/div') {
                let tst = functions.div(queryParam.firstNumber, queryParam.secondNumber);
                res.write(tst);
                res.end();
            } 
    }

    }).listen(8080);
}

runServer();

