var gulp 		= require('gulp'),
	watch 		= require('gulp-watch'),
	browserSync = require('browser-sync').create();  	// The create method of the browser-sync package

gulp.task('watch', function(){

	browserSync.init({ 									// Initializing few settings
		notify: false,									// To hide the notification box on the top-right corner        				
		server: {										// The function that automatically updates the browser after we save the file 
			baseDir: "app"								// Telling Browser Sync where our website lives 
		}												// We need to do this because Browser Sync actually spins up a little web server on our computer
	});													// and it should know where that web server should point
	watch('./app/index.html', function(){
		browserSync.reload();							// The function that automatically reloads the webpage after hitting save 	
	});													// Browser Sync opens our browser and points to the web server

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
});

// Browser-Sync can actually inject latest our latest CSS into the page without even forcing a refresh 

gulp.task('cssInject', ['styles'], function(){ 			// Using browserSync function to also work on CSS file, 
														// anything we change on that file, will automatically 
														// update on the browser 
	return gulp.src('./app/temp/styles/styles.css')		// Browser-Sync will take this content and inject them
		.pipe(browserSync.stream());					// into the page on the fly
});														// Anytime we save a change to any CSS file we're triggering 
														// the 'cssInject' task and we build that cssInject task 
														// in such a way that it won't even begin until the styles
														// task has a chance to run and complete, so that way the 
														// compiled CSS file will have had a chance to be generated and 
														// only at that point we pipe it into Browser-Sync  


