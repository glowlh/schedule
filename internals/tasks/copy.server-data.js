'use strict';

module.exports = () => {
  $.gulp.task('copy:server-data', () => {
    return $.gulp.src('./source/server-data/**')
      .pipe($.gulp.dest($.config.output + '/assets/server-data'));
  });
};
