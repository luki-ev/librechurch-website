// theme_style
// Compile and export both theme SASS to the theme CSS ('theme/css/')

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

gulp.task('theme_style', function() {
	return gulp.src('./src/theme/sass/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('public/css'))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('public/css'))
});
