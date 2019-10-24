
fs = require('fs');
const data = fs.readFileSync('tst.json', 'utf8');

function main(){
    let com = {
        path: "tin-drink/src/App.test.js",
        commit_id: "8c0ef5ca8a8650eaffe46c0adc15ad694c34de31",
        line: 5,
        side: "LEFT",
        body: "KURWAS MACKJDNIPREN!!!!"
    }
    //console.log(JSON.stringify(com));
    // fs.writeFile('test.json', JSON.stringify(com), 'utf-8', (err) => {
    //     if (err) {
    //         throw err;
    //     } else {
    //         console.log('The file has been saved!');
    //     }
    // });
    prepareCommentFiles(data);
}

function prepareCommentFiles(content) {
    var parseContent = JSON.parse(content);

    parseContent.forEach(function (file, fisrtIndex) {
        var allPath = file.filePath;
        var comPath = allPath.split('/work/1/s/');
       console.log(Array.isArray(file.messages));
       file.messages.forEach(function(message, secondIndex) {
            console.log(message);
            console.log(comPath);
            console.log(fisrtIndex);
            console.log(secondIndex);
            let com = {
                path: comPath[1],
                commit_id: "8c0ef5ca8a8650eaffe46c0adc15ad694c34de31",
                line: message.line,
                side: "LEFT",
                body: message.message
            };
            fs.writeFile('jslintcomments/file' + fisrtIndex + 'message' + secondIndex + 'jslint.json', JSON.stringify(com), 'utf-8', (err) => {
                if (err) {
                     throw err;
                } else {
                     console.log('The file has been saved!');
                }
            });
       });
    });
}

main();