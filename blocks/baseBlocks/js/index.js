/*
* Created by:           Ryan Flynn
* Created Date:         Wed, 04 Apr 2018 19:03:50 GMT
* Date last edited:     Thu, 05 Apr 2018 04:56:06 GMT
* Edited last by:       Ryan Flynn
* Contributors:         Ryan Flynn
*/

const fullname = require("fullname");
const fs = require("fs");
const path = require("path");


const fileTypes = [".js", ".jsx", ".scss"];

const create = (filename) => {
    let file = path.resolve(filename);
    return new Promise((resolve, reject) => {
        fullname().then((name) => {
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
                        if (err) return reject(filename);
                        resolve(filename);
                    });
                } catch(err) {
                    reject(filename);
                }
            });
        });
    });
};

const modify = (filename) => {
    return new Promise((resolve, reject) => {
        let file = path.resolve(filename);
        fullname().then((name) => {
            let matches;

            fs.readFile(file, "utf8", (err,doc) => {
                if (err) { return reject(filename); }
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
                        if (err) return reject(filename);
                        resolve(filename);
                    });
                } catch(err) {
                    reject(filename);
                }
            });

        });
    });
};


module.exports.fileTypes = fileTypes;
module.exports.modify = modify;
module.exports.create = create;