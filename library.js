"use strict";

var path = require('path');
var nconf = require('nconf');

var topics = require(path.join(nconf.get('base_dir'), 'src/topics'));
var controllers = require('./lib/controllers');

var AnonCategory = nconf.get('anoncat:category');
var AnonPosterID = nconf.get('anoncat:posterId'),

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

plugin.anonTopic = function(params, callback) {
	console.log("Called anonTopic");
	console.log(params);

	if(params.topic.cid == AnonCategory) {
		params.topic.uid = AnonPosterID;
		params.data.uid = AnonPosterID;
		
		// we need this to stay as is due to forum modaration concerns
		//params.data.req.uid = 0;

		console.log(params);
	}

	callback(null, params);
}

plugin.createAnonPost = function(params, callback) {
	console.log("-------------------");
	console.log("called createAnonPost");
	console.log(params);
	console.log(callback);

	console.log("trying to change author");
	
	if(params.post.hasOwnProperty("cid")) {
		let cid = params.post.cid;
		
		if(cid ==  AnonCategory) {
			params.post.uid = AnonPosterID;
			params.data.uid = AnonPosterID;
			
			// we need this to stay as is due to forum modaration concerns
			//params.data.req.uid = 0;
		}

		console.log(params);

		callback(null, params);
	}

	else {
		
		topics.getTopicField(params.post.tid, 'cid', function(err, category) {
			if (err) {
				console.log("There was an error in anonymizer");
				callback(null, params);
			}
	
			console.log("post belongs to category ");
			console.log(category);

			if(category == AnonCategory) {
				params.post.uid = AnonPosterID;
				params.data.uid = AnonPosterID;
				
				// we need this to stay as is due to forum modaration concerns
				//params.data.req.uid = 0;
			}
			
			console.log(params);

			callback(null, params);
		});
		
	}
	
};


module.exports = plugin;