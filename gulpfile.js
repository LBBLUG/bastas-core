var gulp = require("gulp");
var ts = require("gulp-typescript");
var gulpTypings = require("gulp-typings");
var merge = require('merge2');


gulp.task("installTypings",function(){
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

gulp.task("build", ["installTypings"], function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src()
        .pipe(ts(tsProject))
        .on('error', function() { process.exit(1) });
    return merge([
        tsResult.dts.pipe(gulp.dest('lib')),
        tsResult.js.pipe(gulp.dest('lib'))
    ]);
});