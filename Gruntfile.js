//keep jshint happy
var module = module || {};

//versioning
//http://datasift.github.io/gitflow/Versioning.html

module.exports = function (grunt) {

    'use strict';

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // A list of files, which will be syntax-checked by JSHint
        jshint: {
            files: ['Gruntfile.js', 'lib/*.js'],
        },

        watch: {
            files: '<%= jshint.files %>',
            tasks: 'jshint'
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // if grint is called without any further parameter
    grunt.registerTask('default', ['jshint']);
};
