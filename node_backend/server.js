const http = require('http');
const functions = require('./utils');

//create a server object

function runServer() {
    http.createServer((req, res) => {
        if(req.url === '/albert') {

            res.write('Hej, Jestem Albert' + functions.add(4, 6));
            res.end();
        }

        if(req.url === '/api/albert') {
            res.write('Albert mówi ')
            res.end();
        }

    }).listen(8080);
}

runServer();