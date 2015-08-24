'use strict';

module.exports = {
	app: {
		title: 'Online MCQ & Survey System',
		description: 'MCQ',
		keywords: 'MCQ'
	},
	port: process.env.PORT || 4000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'client/lib/bootstrap/dist/css/bootstrap.css',
				'client/lib/bootstrap/dist/css/bootstrap-theme.css',
				'client/lib/font-awesome/css/font-awesome.css',
				'client/lib/toastr/toastr.css'
			],
			js: [
				'client/lib/jquery/dist/jquery.js',
				'client/lib/angular/angular.js',
				'client/lib/angular-resource/angular-resource.js', 
				'client/lib/angular-cookies/angular-cookies.js', 
				'client/lib/angular-sanitize/angular-sanitize.js',
				'client/lib/spin.js/spin.js',
				'client/lib/angular-spinner/angular-spinner.js',
				'client/lib/angular-ui-router/release/angular-ui-router.js',
				'client/lib/angular-ui-utils/ui-utils.js',
				'client/lib/bootstrap/dist/js/bootstrap.js',
				'client/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'client/lib/toastr/toastr.js'
			]
		},
		css: [
			'client/modules/**/css/*.css'
		],
		js: [
			'client/config.js',
			'client/application.js',
			'client/modules/*/*.js',
			'client/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'client/lib/angular-mocks/angular-mocks.js',
			'client/modules/*/tests/*.js'
		]
	}
};
