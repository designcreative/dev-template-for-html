var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    jade = require("gulp-jade"),
    imagemin = require("gulp-imagemin"),
    browserSync = require("browser-sync").create();

gulp.task("sass", function() {
  return gulp.src("src/sass/custom.sass")
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task("imagemin", function() {
  gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("jade", function () {
  return gulp.src("src/*.jade")
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("browserSync", function () {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
  });
});

gulp.task("watch", ["browserSync", "sass", "jade", "imagemin"], function () {
  gulp.watch("src/sass/**/*.sass", ["sass"]);
  gulp.watch("src/**/*.jade", ["jade"]);
  gulp.watch("src/img/*", ["imagemin"]);
});

gulp.task("default", ["watch"]);
