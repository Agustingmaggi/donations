var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen(); // Inicia el servidor de livereload
    gulp.watch(['**/*'], function(event) { // Observa cambios en todos los archivos
        livereload.reload(); // Recarga la página automáticamente
    });
});






