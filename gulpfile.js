'use strict';

// PROJECT
// - - - - - - - - - - - - - - -
global.$ = {
  dev: true,
  package: require('./package.json'),
  config: require('./internals/config'),
  path: {
    tasks: require('./internals/paths/tasks.js'),
    sass: require('./internals/paths/sass.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  webpack: require('webpack'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')({
    rename: {
      'gulp-replace-task': 'replaceTask'
    }
  })
};

// TASKS
// - - - - - - - - - - - - - - -
$.path.tasks.forEach(taskPath =>  require(taskPath)());

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'pug',
    'webpack:app',
    'copy:fonts',
    'copy:server-data',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'watch',
    'server'
  )
));

$.gulp.task('build', $.gulp.series(
  cb => {$.dev = false; cb()},
  'clean',
  $.gulp.parallel(
    'sass',
    'pug',
    'webpack:app',
    'copy:fonts',
    'sprite:svg'
  )
));
