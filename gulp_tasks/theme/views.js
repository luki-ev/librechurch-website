// theme_views
// Compile EJS views to HTML the theme folder root ('theme/')

const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const log = require('fancy-log');
const replace = require('gulp-replace-path');

gulp.task('theme_views',function(){
	var myReg = /<a([^>]*?)href\s*=\s*(['"])([^\2]*?)\2\1*>/i;
	return gulp.src('src/theme/*.ejs')
	.pipe((replace(/href\s*=\s*(['"])\/(.*?)(['"])/g,'href="./$2.php"')))
	.pipe(replace("./.php", "index.php"))
	.pipe(ejs({ asset: function(assetLoc){ return assetLoc; }, convertType: ".php"}, {}).on('error', log))
	.pipe(rename({ extname: '.php' }))
	.pipe(gulp.dest('./public'))
});