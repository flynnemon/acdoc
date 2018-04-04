#!/usr/bin/env node

/*
* Created by: 			Ryan Flynn
* Created Date: 		Wed, 04 Apr 2018 03:49:43 GMT
* Date last edited:		Wed, 04 Apr 2018 05:38:25 GMT
* Edited last by:		Ryan Flynn
* Contributors: 		Ryan Flynn, Adam Link
*/

const fullname = require('fullname');
const fs = require('fs');
const path = require('path');
const sgf = require("staged-git-files");
const _ = require('lodash');

const slashComments = ['.js', '.jsx', '.scss'];
const hashComments = [];
const htmlComments = [];

const writeFile = (file, name) => {
	let matches;
	fs.readFile(file, 'utf8', (err,doc) => {
		if (err) {
			return console.log(err);
		}
		try {
			// change last edited date
			matches = doc.match(/.*([Dd]ate last edited:\s*(.*))\r?\n/)
			const dateLine = matches[1]
			const date = matches[2]
			doc = doc.replace(dateLine, dateLine.replace(date, "") + new Date().toUTCString())

			// change last user to edit field
			matches = doc.match(/.*([Ee]dited last by:\s*(.*))\r?\n/)
			const userLine = matches[1]
			const user = matches[2]
			doc = doc.replace(userLine, userLine.replace(user, name))

			// modify contributers list
			matches = doc.match(/.*([Cc]ontributors:\s*(.*))\r?\n/)
			const contribLine = matches[1]
			const contribs = matches[2]
			if(contribs.indexOf(name) < 0) {
				doc = doc.replace(contribLine, contribLine.replace(contribs, `${contribs}, ${name}`))
			}

			fs.writeFile(file, doc, 'utf8', (err) => {
				if (err) return console.log(err);
			});
		} catch(err) {
			return
		}
	});
};


console.log("Starting ACdoc");
fullname().then(name => {
	sgf('AMCR', ((err, data) => {
		_.forEach(data, (file) => {
			let abPath = path.resolve(file.filename);
			if( slashComments.indexOf(path.extname(abPath)) > -1 ){
				writeFile(abPath, name)
				console.log(`Updating accountibility docblock for ${file.filename}`);
			}
		});
	}))
}).catch(err => {
	console.log(err)
});