/*
* Created by:           Ryan Flynn
* Created Date:         Thu, 05 Apr 2018 04:51:55 GMT
* Date last edited:     Thu, 05 Apr 2018 04:56:06 GMT
* Edited last by:       Ryan Flynn
* Contributors:         Ryan Flynn
*/

const path = require("path");
const _ = require("lodash");
const simpleGit = require("simple-git")();

const baseBlocks = require("require-all")({
    dirname     :  __dirname + "/blocks/baseBlocks",
    filter      :  "index.js",
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});

const blocks = require("require-all")({
    dirname     :  __dirname + "/blocks/addon",
    filter      :  "index.js",
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});


const controller = (proc, file) => {
    if( proc["index.js"].fileTypes.indexOf(path.extname(file)) > -1 ){
        proc["index.js"].modify(file).then((file) => {
            simpleGit.add(file);
            console.log(`Updating accountibility docblock for ${file}`);
        }).catch(() => {
            proc["index.js"].create(file).then((file) => {
                console.log(`Created accountibility docblock for ${file}`);
            });
        });
    }
};

const launcher = (files) => {
    _.forEach(files, (file) => {
        _.forEach(baseBlocks, (proc) => {
            controller(proc, file);
        });
        _.forEach(blocks, (proc) => {
            controller(proc, file);
        });
    });
    return files;
};

module.exports = launcher;