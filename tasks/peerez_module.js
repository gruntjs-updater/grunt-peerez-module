/*
 * grunt-peerez-module
 * https://github.com/Songbee/grunt-peerez-module
 *
 * Copyright (c) 2014 Ale
 * Licensed under the Proprietary license.
 */

'use strict';

var path = require("path");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks


  grunt.registerMultiTask('peerez', 'Grunt plugin for peerez/Songbee module generation.', function() {
    var options = this.options({});

    grunt.log.write(JSON.stringify(this.files));

    this.files.forEach(function(f) {
      grunt.log.write(f.src);
      var manifest = grunt.file.readJSON(f.src);
      var dir = path.dirname(f.src);
      var style = "";
      var code = "";

      if (typeof manifest.css !== "undefined") {
        manifest.css.forEach(function(css) {
          style = grunt.file.read(path.resolve(dir, css)) + "\n";
        });
      }

      if (typeof manifest.files !== "undefined") {
        manifest.files.forEach(function(js) {
          code = grunt.file.read(path.resolve(dir, js)) + "\n";
        });
      }

      manifest.style = style;
      manifest.code = code;
      manifest.css = undefined;
      manifest.files = undefined;

      grunt.file.write(f.dest, JSON.stringify(manifest));
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
