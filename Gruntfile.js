//keep jshint happy
var module = module || {};

//versioning
//http://datasift.github.io/gitflow/Versioning.html

module.exports = function (grunt) {

    'use strict';

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

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
        },

        // Files to be concatenated (source and destination files)
        concat: {
            js: {
                src: ['lib/!(frequent*).js'],
                dest: '<%= pkg.name %>.<%= pkg.version %>.js'
            }
        },

        //and minified (source and destination files)
        uglify: {
            options: {
                banner: '/* <%= pkg.name %>.<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) <%= pkg.repository.url %> */'
            },
            my_target: {
                files: {
                    '<%= pkg.name %>.<%= pkg.version %>.min.js': ['<%= concat.js.dest %>']
                }
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
    grunt.registerTask('default', ['jsdoc', 'jshint', 'jsdoc', 'concat', 'uglify']);
    grunt.registerTask('build', ['concat', 'uglify']);
};
