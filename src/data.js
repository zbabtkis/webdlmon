define(['backbone', 'underscore', 'Settings', 'io'], function(Backbone, _, config, io) {
	"use strict";

	return function(vent) {
		var socket  = io.connect(config.APP_URL)
		  , RRD_URL = config.APP_URL + '/rrd/';
			
		// Data fetch functionality from RRD. 
		vent.on('InfoDataFetchBehavior', function(id, add) {
			$.when($.getJSON(RRD_URL + id + '/dv'))
				.then(function(data) {
						add({name: data.field.field, data: data.data});
					});
		});

		vent.on('InfoDataFetchBehavior', function(id, add) {
			$.when($.getJSON(RRD_URL + id + '/da'))
				.then(function(data) {
					data.data = _.map(data.data, function(item) {
						return [item[0], item[1] * 100];
					});
						
					add({name: 'da (x100)', data: data.data});
				});
		});

		vent.on('InfoDataFetchBehavior', function(id, add) {
			$.when($.getJSON(RRD_URL + id + '/dt'))
				.then(function(data) {
					add({name: data.field.field, data: data.data});
				});
		});

		vent.on('FieldDataFetchBehavior', function(id, field, add) {
			$.when($.getJSON(RRD_URL + id + '/' + field))
				.then(function(data) {
					add({name: data.field.field, data: data.data});
				});
		});

		// Socket.io adapter.
		socket.on('die', function() {
			vent.trigger('flash', {
				message: config.RRD_ERR_MSG,
			  	type: 'error',
			  	method: 'keep'
			});

			socket.once('live', function() {
				vent.trigger('flash', {
					message: config.RRD_OK_MSG,
				  	type: 'success'
				});
			});
		});

		socket.on('data', function(data) {
			vent.trigger('data', data);
		});

		socket.on('error', function(err) {
			vent.trigger('error', err);
			vent.trigger('flash', {
				message: err,
				type: 'error'
			});
		});
	};
});
