module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      sass: {
        files: ['./css/sass/*.scss', './css/sass/*/*.scss', './*.html'],
        tasks: ['sass:dev', 'autoprefixer:dev'],
        options: {
          livereload: true
        }
      },
    },

    sass: {
      dev: {
        options: {
          outputStyle: 'nested',
          sourceMap: true
        },
        files: {
          './css/style.css': './css/sass/style.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: {
          './css/style.min.css': './css/sass/style.scss'
        }
      }
    },

    autoprefixer: {
      dev: {
        options: {
          map: true, 
          browsers: ['ie >= 8', '> 0%']
        }, 
        src: './css/style.css',
        dest: './css/style.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', [
    'watch'
  ]);
  grunt.registerTask('dist', [
    'autoprefixer', 'sass:dist'
  ]);
};