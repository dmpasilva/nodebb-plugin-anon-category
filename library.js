"use strict";

var path = require('path');
var nconf = require('nconf');

var topics = require(path.join(nconf.get('base_dir'), 'src/topics'));
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

	console.log("trying to change author");
	
	if(params.post.hasOwnProperty("cid")) {
		let cid = params.post.cid;
		
		//console.log("post belongs to category ");
		//console.log(cid);
		if(cid == 36) {
			console.log("o autor é");
			params.post.uid = 1;
			params.data.uid = 1;
			//params.data.req.uid = 1;
		}

		console.log(params);

		callback(null, params);
		console.log("finished");
		console.log("-------------------");
	}
	else {
		
		topics.getTopicField(params.post.tid, 'cid', function(err, category) {
			if (err) {
				console.log("There was an error in anonymizer");
				callback(null, params);
			}
	
			console.log("post belongs to category ");
			console.log(category);

			if(category == 36) {
				console.log("o autor é");
				params.post.uid = 1;
				params.data.uid = 1;
				//params.data.req.uid = 1;
				
			}
			
			console.log(params);

			callback(null, params);
			console.log("finished");
			console.log("-------------------");
		});
		
	}

	
};


module.exports = plugin;