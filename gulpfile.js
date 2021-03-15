const concat = require("gulp-concat");
const gulp = require("gulp");

const bundles = [ 
	"dist/rise-video.js", 
	"dist/rise-video-bundle.min.js"
];
const dependencies = [
  "node_modules/video.js/dist/video.min.js",
  "node_modules/videojs-playlist/dist/videojs-playlist.min.js"
];

gulp.task( "default", (done) => {
  bundles.map(function(file) {
    return gulp.src( dependencies.concat( file ) )
      .pipe( concat( file ) )
      .pipe( gulp.dest( "." ) );
  });
  done();
});
