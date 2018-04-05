/*
* Created by:           Ryan Flynn
* Created Date:         Thu, 05 Apr 2018 04:09:16 GMT
* Date last edited:     Thu, 05 Apr 2018 04:56:06 GMT
* Edited last by:       Ryan Flynn
* Contributors:         Ryan Flynn
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