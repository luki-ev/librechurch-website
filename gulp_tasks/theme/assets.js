// theme_assets
// Move the necessary images to the theme folder ('Evie/assets')

const gulp = require('gulp');

gulp.task('theme_assets', function(done){
	return gulp.src(['src/theme/**/*']).pipe(gulp.dest('public/')); // Transfer every asset
});