#!/usr/bin/env node

/*
* Created by:           Ryan Flynn
* Created Date:         Wed, 04 Apr 2018 03:49:43 GMT
* Date last edited:     Thu, 05 Apr 2018 04:56:06 GMT
* Edited last by:       Ryan Flynn
* Contributors:         Ryan Flynn, Adam Link
*/

const sgf = require("staged-git-files");
const _ = require("lodash");
const launcher = require("../index.js");

console.log("Starting ACdoc");
sgf("AMCR", ((err, data) => {
    let fileArray = [];
    _.forEach(data, (file) => {
        fileArray.push(file.filename);
    });
    launcher(fileArray);
}));