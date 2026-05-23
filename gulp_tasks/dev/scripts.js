const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('scripts_dev_theme', function(){
	var glob = [];
	// Push the theme JS first to concat everything
	glob.push('src/theme/js/libraries/**/*.js');
	glob.push('src/theme/js/app.js');
	return gulp.src(glob)
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest('src/theme/public/js'))
});