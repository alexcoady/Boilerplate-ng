var gulp = require("gulp");

// Server
var browserSync = require("browser-sync");
var connectModrewrite = require("connect-modrewrite");

// Scripts
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var ngAnnotate = require("gulp-ng-annotate");

// Bower
var bowerFiles = require("main-bower-files");

// Style
var sass = require("gulp-ruby-sass");
var autoprefixer = require("gulp-autoprefixer");
var minifyCSS = require("gulp-minify-css");

// Utility
var gulpif = require("gulp-if");
var argv = require("yargs").argv;
var rename = require("gulp-rename");
var concat = require("gulp-concat");


gulp.task("browserSync", function () {

  browserSync({
    server: {
      baseDir: "./build/",
      middleware: [ connectModrewrite(["!\\.\\w+$ /index.html [L]"]) ]
    },
    open: false
  });
});

gulp.task("scripts", function () {
  gulp.src(["./source/**/module.js", "./source/**/*.js"])
    .pipe(sourcemaps.init())
      .pipe(concat("app.js"))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/scripts"));
});

gulp.task("sass", function () {

  sass("./source/style/main.scss")
    .on("error", function ( err ) {
      console.error("Error: sass task", err.message);
    })
    .pipe(autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
    }))
    .pipe( gulpif( argv.production, minifyCSS()) )
    .pipe( gulpif( argv.production, rename({suffix: ".min"})) )
    .pipe( gulp.dest("./build/") )
    .pipe( browserSync.reload({ stream: true }) );
});

gulp.task("copy:bower", function () {

  gulp.src( bowerFiles() )
    .pipe(gulp.dest("./build/scripts/vendor"));
});

gulp.task("copy:html", function () {

  gulp.src( ["./source/*.html"] )
    .pipe( gulp.dest("./build/") );
});

gulp.task("copy", [ "copy:html", "copy:bower" ]);

gulp.task("default", [  "scripts", "sass", "copy" ]);

gulp.task("watch", ["default", "browserSync"], function () {
  gulp.watch([ "./source/**/*.js" ], ["scripts"]);
  gulp.watch([ "./source/*.html" ], [ "copy:html", browserSync.reload ] );
  gulp.watch([ "./source/style/**/*.scss" ], [ "sass" ]);

  gulp.watch([ "./build/**/*.{js,html,css}" ], browserSync.reload );
});
