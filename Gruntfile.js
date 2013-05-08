//keep jshint happy
var module = module || {};

module.exports = function (grunt) {

    'use strict';

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        //export JAVA_HOME=/System/Library/Frameworks/JavaVM.framework/Home
        jsdoc : {
            dist : {
                src: ['lib/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        // A list of files, which will be syntax-checked by JSHint
        jshint: {
            files: ['Gruntfile.js', 'lib/*.js'],
            //http://www.jshint.com/docs/
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
                indent: 4,
                loopfunc: false,
                nomen: false,
                noempty: true,
                onevar: false,
                plusplus: false,
                quotmark: 'single',
                regexp: false,
                regexdash: true,
                shadow: true,
                strict: true,
                trailing: true,
                undef: true,
                unused: true,
                validthis: true,
                white: true,
                predef: ['$', '_', 'define', 'require']
            }
        },

        // Files to be concatenated (source and destination files)
        concat: {
            js: {
                src: ['lib/*.js'],
                dest: 'lib/freQuent.js'
            }
        },

        //and minified (source and destination files)
        uglify: {
            dist: {
                src: ['<%= concat.js.dest %>'],
                dest: 'lib/freQuent.min.js'
            }
        },

        watch: {
            files: '<%= jshint.files %>',
            tasks: 'jshint'
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');

    // if grint is called without any further parameter
    grunt.registerTask('default', ['jshint']);
};