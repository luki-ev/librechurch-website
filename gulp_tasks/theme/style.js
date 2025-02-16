// theme_style
// Compile and export both minified and unminified theme SASS to the theme CSS ('theme/css/')

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('theme_style', function() {
	const plugins = [ autoprefixer(), cssnano() ];
	return gulp.src('./src/theme/sass/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('public/css'))
	.pipe(postcss(plugins))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('public/css'))
});
