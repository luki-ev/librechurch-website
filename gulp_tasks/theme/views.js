// theme_views
// Copy static HTML views to the theme folder root ('theme/')

const gulp = require('gulp');

gulp.task('theme_views',function(){
	return gulp.src('src/theme/*.html')
	.pipe(gulp.dest('./public'))
});