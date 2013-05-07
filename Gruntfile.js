var module = module || {};

module.exports = function (grunt) {

    'use strict';

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        //export JAVA_HOME=/System/Library/Frameworks/JavaVM.framework/Home
        jsdoc : {
            dist : {
                src: ['core/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        // A list of files, which will be syntax-checked by JSHint
        jshint: {
            files: ['Gruntfile.js', 'core/*.js'],
            //https://github.com/gruntjs/grunt-contrib-jshint/blob/master/docs/jshint-examples.md
            options: {
                bitwise: false,
                browser: true,
                debug: true,
                devel: true,
                eqeqeq: true,
                evil: true,
                forin: false,
                immed: true,
                loopfunc: false,
                nomen: false,
                onevar: false,
                plusplus: false,
                regexp: false,
                regexdash: true,
                shadow: true,
                strict: true,
                trailing: true,
                undef: true,
                validthis: true,
                white: true,
                predef: ['$', '_', 'define', 'require']
            }
        },

        // Files to be concatenated (source and destination files)
        concat: {
            js: {
                src: ['core/*.js'],
                dest: 'core/core.js'
            }
        },

        //and minified (source and destination files)
        uglify: {
            dist: {
                src: ['<%= concat.js.dest %>'],
                dest: 'core/core.min.js'
            }
        },

        watch: {
            files: '<%= jshint.files %>',
            tasks: 'jshint'
        }

    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');


    // This is the default task being executed if Grunt
    // is called without any further parameter.
    grunt.registerTask('default', ['jshint']);

};