
fs = require('fs');
const data = fs.readFileSync('eslint.json', 'utf8');
const myArgs = process.argv.slice(2);
commitId = myArgs[0]

function main(){
    prepareComment(data);
}

function createComments(comPath, comCommitId, comLine, comBody, fileName) {
    console.log("IN FUNCTION -->>"  + comLine );
    console.log("FILE ---->>>> " + fileName);
    let com = {
        path: comPath,
        commit_id: comCommitId,
        line: comLine,
        side: "RIGHT",
        body: comBody
    };
    fs.writeFile('eslintComments/file' + fileName + 'jslint.json', JSON.stringify(com), (err) => {
        if (err) {
            throw err;
        } else {
            console.log('The file has been saved!');
        }
    });
}

function prepareComment(content) {
    var parseContent = JSON.parse(content);
    var mapLines = new Map();
    parseContent.forEach(function (file, fisrtIndex) {
        var comPath = file.filePath.split('\\changedFiles\\')[1];
        file.messages.forEach(function(message, secondIndex) {
            let keyMapProp = {
                file: comPath,
                line: message.line
            };
            let keyMap = JSON.stringify(keyMapProp);
            if (mapLines.has(keyMap)) {
                mapLines.get(keyMap).push(message.message);
            } else {
                var commentsArr = Array(message.message);
                mapLines.set(keyMap, commentsArr);
            }
       });
    });

    var i = 0;
    mapLines.forEach((v, k, m) => {
        var finalComments = '';
        v.forEach((comment, index) =>{
            finalComments += comment + '\n';
        });
        key = (JSON.parse(k));
        createComments(key.file, commitId, key.line, finalComments, i + 'message' + key.line);
        i++;
    });

}
main();