// theme_scripts
// Concat and export both minified and unminified JavaScript files theme folder ('theme/js/')

const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

gulp.task('theme_scripts', function(){
	var glob = [];
	glob.push('src/theme/js/libraries/**/*.js');
	glob.push('src/theme/js/app.js');
	return gulp.src(glob)
	.pipe(concat('app.js'))
	.pipe(gulp.dest('public/js'))
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest('public/js'))
});