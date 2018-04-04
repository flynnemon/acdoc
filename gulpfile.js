/*
* Created by: 			Ryan Flynn
* Created Date: 		Wed, 04 Apr 2018 07:17:02 GMT
* Date last edited:		Wed, 04 Apr 2018 07:17:02 GMT
* Edited last by:		Ryan Flynn
* Contributors: 		Ryan Flynn
*/

"use strict";
const gulp = require("gulp");
const eslint = require("gulp-eslint");

gulp.task("lint", () => {
    return gulp.src(["**/*.js","!node_modules/**", "!test/**", "!coverage/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("pre-commit", ["lint"]);
	    