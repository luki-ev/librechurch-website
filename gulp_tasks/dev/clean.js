// clean => This cleans every folder generated

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', function(done) {
	return del([
		'src/theme/public/css/*','src/theme/public/js/*',
		'public/**'
	]);
});