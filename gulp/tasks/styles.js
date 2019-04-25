var gulp 			= require ('gulp'),
 	postcss 		= require ('gulp-postcss'),
 	autoprefixer 	= require ('autoprefixer'),
 	cssvars 		= require ('postcss-simple-vars'),
 	nested 			= require ('postcss-nested'),
 	cssImport 		= require ('postcss-import'),
 	mixins			= require('postcss-mixins');


gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer])) 	// Connecting a new pipe on the pipe below which will add Post CSS filters to our CSS file
		.on('error', function(errorInfo) {
		console.log(errorInfo.toString());									// To make the gulp watch function keep on running even after an error occured
			this.emit('end');												// When an error occurs this function will tell Gulp that the styles.js file
		})																	// has ended running which will make the gulp watch to continue
		.pipe(gulp.dest('./app/temp/styles')); 								// Connecting a pipe to the location of styles.css which will transfer the file to new destination
});	