import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';

// Load the gulp plugins into the `plugins` variable
const plugins = loadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**']
};

gulp.task('clean', () => {
  return del('dist/**');
});

// Compile all Babel Javascript into ES5 and put it into the dist dir
gulp.task('babel', () => {
  return gulp.src(paths.js, { base: '.' })
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist'));
});

// Start server with restart on file change events
gulp.task('nodemon', ['babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['babel']
  }).on('start', function() {
    console.clear();
   }).on('restart', function() {
    console.clear();
   })
);

gulp.task('apidoc', (done) => {
    plugins.apidoc({
        src: 'server/routes/',
        dest: 'docs/',
        config: ''
    }, done);
});
