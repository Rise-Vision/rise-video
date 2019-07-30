const concat = require("gulp-concat");
const gulp = require("gulp");

const bundle = "dist/rise-video.js";
const dependencies = [
  "node_modules/video.js/dist/video.min.js",
  "node_modules/videojs-playlist/dist/videojs-playlist.min.js"
];

gulp.task( "default", () => {
  return gulp.src( dependencies.concat( bundle ) )
    .pipe( concat( bundle ) )
    .pipe( gulp.dest( "." ) );
});