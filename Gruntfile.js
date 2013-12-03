var fs = require('fs')
  , $  = require('jquery');

module.exports = function(grunt) {
	/** 
	 * Read in require.js config file.
	 */

	var requireConfig = eval(fs.readFileSync('build.js', {encoding: 'utf8'}));

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		cssmin: {
			combine: {
				files: {
					'build/css/main.css': ['css/main.css', 'css/paul.css']
				}
			},
			minify: {
				expand: true,
				cwd: 'build/css',
				src: ['main.css'],
				dest: 'build/css/',
				ext: '.min.css'
			}
		},

		requirejs: {
			compile: {
				options: requireConfig
			}
		},

		rsync: {
			deploy: {
				options: {
					host: 'mendo',
					user: 'zack',
					remoteBase: '/var/www/vhosts/www.nees.ucsb.edu/sites/all/modules/nees/webdlmon',
					recursive: true
				},
				files: {
					'': 'build'
				}
			}
		}
	});

	/**
	 * Custom task to convert index.html to Drupal template
	 */

	grunt.task.registerTask('drupal-template', 'builds a drupal template from an index file', function() {
		var index = grunt.file.read('index.html', {encoding: 'utf8'})
		  , html = $(index).find('body').html();

		html += "\n<!-- WebDLMon Application -->\n";
		html += "<script src='<?php print $module_path; ?>build/require.js' data-main='<?php print $module_path; ?>build/app'></script>\n";

		grunt.file.write('build/webdlmon.tpl.php', html);
	});

	/**
	 * Custom task to copy require.js from bower_components to the
	 * build directory.
	 */

	grunt.task.registerTask('copy-require', 'Copy require.js to build directory', function() {
		grunt.file.copy('bower_components/requirejs/require.js', 'build/require.js');
	});

	grunt.task.registerTask('abstract-stylesheets', "record included stylesheets to JSON", function() {
		var index = grunt.file.read('index.html', {encoding: 'utf8'})
		  , sheets = $(index).find('link')
		  , CSS_DIR = /^css\/(.*?)$/
		  , sList  = [];

		sheets.each(function() {
			var href = $(this).attr('href');

			if(!href.match(CSS_DIR)) {
				sList.push(href);
			}
		});

		sList.push('build/css/main.min.css');

		grunt.file.write('build/stylesheets.json', JSON.stringify(sList));
	});

	/**
	 * Load installed grunt tasks
	 */

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-rsync-2');

	/**
	 * Establish grunt routines
	 */

	grunt.registerTask('build', ['cssmin', 'requirejs']);
	grunt.registerTask('publishDrupal', ['build', 'abstract-stylesheets', 'drupal-template', 'copy-require', 'rsync']);
	grunt.registerTask('drupalNoBuild', ['cssmin', 'abstract-stylesheets', 'drupal-template', 'copy-require', 'rsync']);
}
