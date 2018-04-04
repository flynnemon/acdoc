/*
* Created by:           Ryan Flynn
* Created Date:         Wed, 04 Apr 2018 19:03:50 GMT
* Date last edited:     Wed, 04 Apr 2018 19:11:46 GMT
* Edited last by:       Ryan Flynn
* Contributors:         Ryan Flynn
*/

const fs = require("fs");
const path = require("path");
const sgf = require("staged-git-files");
const simpleGit = require('simple-git')();


const fileTypes = [".js", ".jsx", ".scss"];

const writeNew = (file, name, filename) => {
    fs.readFile(file, "utf8", (err,doc) => {
        if (err) {
            return console.log(err);
        }

        let acBlock = `/*
* Created by:           ${name}
* Created Date:         ${new Date().toUTCString()}
* Date last edited:     ${new Date().toUTCString()}
* Edited last by:       ${name}
* Contributors:         ${name}
*/

${doc}`;

        try {
            fs.writeFile(file, acBlock, "utf8", (err) => {
                if (err) return console.log(err);
                simpleGit.add(filename);
                console.log(`Creating accountibility docblock for ${filename}`);
            });
        } catch(err) {
            return;
        }
    });
};

const modify = (file, name, filename) => {
    let matches;
    fs.readFile(file, "utf8", (err,doc) => {
        if (err) {
            return console.log(err);
        }
        try {
            // change last edited date
            matches = doc.match(/.*([Dd]ate last edited:\s*(.*))\r?\n/);
            const dateLine = matches[1];
            const date = matches[2];
            doc = doc.replace(dateLine, dateLine.replace(date, "") + new Date().toUTCString());

            // change last user to edit field
            matches = doc.match(/.*([Ee]dited last by:\s*(.*))\r?\n/);
            const userLine = matches[1];
            const user = matches[2];
            doc = doc.replace(userLine, userLine.replace(user, name));

            // modify contributers list
            matches = doc.match(/.*([Cc]ontributors:\s*(.*))\r?\n/);
            const contribLine = matches[1];
            const contribs = matches[2];
            if(contribs.indexOf(name) < 0) {
                doc = doc.replace(contribLine, contribLine.replace(contribs, `${contribs}, ${name}`));
            }
            fs.writeFile(file, doc, "utf8", (err) => {
                if (err) return console.log(err);
                simpleGit.add(filename);
                console.log(`Updating accountibility docblock for ${filename}`);
            });
        } catch(err) {
            writeJsStyle(file, name, filename);
        }
    });
};

module.exports.fileTypes = fileTypes;
module.exports.modify = modify;
module.exports.writeNew = writeNew;