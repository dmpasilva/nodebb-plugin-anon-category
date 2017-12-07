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
	console.log(db);



	console.log("trying to read post");
	console.log(params.post);
	console.log(params.data);
	console.log("finished");

	let cid = undefined;
	
	if(params.post.hasOwnProperty("cid"))
		cid = params.post.cid;
	else {
		let topicID = "topic:"+params.post.tid;
		console.log("Searching for... "+topicID);
		
		cid = topics.getTopicField(topicID, 'cid', function(err, category) {
			if (err) {
				console.log("There was an error in anonymizer");
				return -1;
			}
	
			return category;
		});
		
	}

	console.log("post belongs to category ");
	console.log(cid);
	
	
	//callback();
	callback(null, params);
	console.log("finished");
	console.log("-------------------");
};

module.exports = plugin;