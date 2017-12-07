"use strict";

var controllers = require('./lib/controllers'),

	plugin = {};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/anoncat', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/anoncat', controllers.renderAdminPage);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/anoncat',
		icon: 'fa-tint',
		name: 'Anon Category'
	});

	callback(null, header);
};

plugin.createAnonPost = function(params, callback) {
	console.log("-------------------");
	console.log("called createAnonPost");
	console.log(params);
	console.log(callback);
	
	
	//callback();
	callback(params);
	console.log("finished");
	console.log("-------------------");
};

module.exports = plugin;