'use strict';
/* globals $, app, socket */

define('admin/plugins/anoncat', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('anoncat', $('.anoncat-settings'));

		$('#save').on('click', function() {
			Settings.save('anoncat', $('.anoncat-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'anoncat-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});