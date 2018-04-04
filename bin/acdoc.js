#!/usr/bin/env node

/*
* Created by:           Ryan Flynn
* Created Date:         Wed, 04 Apr 2018 03:49:43 GMT
* Date last edited:     Wed, 04 Apr 2018 19:11:46 GMT
* Edited last by:       Ryan Flynn
* Contributors:         Ryan Flynn, Adam Link
*/

const fullname = require("fullname");
const fs = require("fs");
const path = require("path");
const sgf = require("staged-git-files");
const _ = require("lodash");
const simpleGit = require('simple-git')();

const blocks = require('require-all')({
    dirname     :  __dirname + '/blocks',
    filter      :  'index.js',
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});

console.log("Starting ACdoc");
fullname().then(name => {
    sgf("AMCR", ((err, data) => {
        _.forEach(data, (file) => {
            let abPath = path.resolve(file.filename);
            // Run JS Base Block
            if( blocks.baseBlockJS['index.js'].fileTypes.indexOf(path.extname(abPath)) > -1 ){
                blocks.baseBlockJS['index.js'].modify(abPath, name, file.filename);
            }
        });
    }));
}).catch(err => {
    console.log(err);
});