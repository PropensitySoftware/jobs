// Gruntfile.js
module.exports = function(grunt) {

    grunt.initConfig({

		bower: {
			install: {
				options: {
					targetDir:  'public/bower_components',
					cleanTargetDir:  'true'
				}
			}
		},	
		
        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['src/js/**/*.js']
        },

        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['src/js/**/*.js', 'src/js/*.js']	
                }
            },
			libs: {
                files: [{
					expand: true,
					cwd: 'public/bower_components',
					src: '**/*.js',
					dest: 'public/bower_components'
				}]
            }
			
        },

        // CSS TASKS ===============================================================
        // process the less file to style.css
        less: {
            build: {
                files: {
                    'public/dist/css/main.css': 'src/css/aams.less'
                }
            }
        },

        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/dist/css/main.min.css': 'public/dist/css/main.css'
                }
            }
        },

        // COOL TASKS ==============================================================
        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['src/css/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'uglify']
            }
        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-bower-task');

	
    grunt.registerTask('default', ['bower', 'less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
    grunt.registerTask('build', ['bower', 'less', 'cssmin', 'jshint', 'uglify']);


};