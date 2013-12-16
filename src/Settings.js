/** 
 * General application preferences.
 */

define(function() {
	var settings = {};

	// Where back end is running (used for io integration).
	settings.APP_URL = 'http://webdlmon.nees.ucsb.edu:8888';

	// How long messages should appear before being removed from the DOM.
	settings.MESSAGE_TIMEOUT = 5000;

	// How long to wait before giving up on the RRD (if it can't be accessed 
	// at the time of request).
	settings.RRD_TIMEOUT = 5000 // in miliseconds;
	settings.RRD_ERR_MSG = "No data could be fetched from the RRD";
	settings.ENOFILE     = "file not available";

	
	settings.SOCK_OK_MSG  = "<i class='large thumbs up icon'></i>"
						 + "And we're back!"; 
	settings.SOCK_ERR_MSG = "<i class='large attention icon'></i>"
						 + "This data is old because dlmon2json has stopped!"; 

	settings.CHART_STEP  = "left";

	settings.CHART_OPTIONS = {
		legend: {
			enabled: true,
		},

		animation: false,

		navigator: {
			enabled: false
		},
		
		plotOptions: {
			line: {
				step: 'left' 
			},
		},

		rangeSelector: {
			buttons: [{
				type: 'day',
				count: 1,
				text: '1d'
			}, {
				type: 'week',
				count: 1,
				text: '1w'
			}, {
				type: 'month',
				count: 1,
				text: '1m'
			}, {
				type: 'month',
				count: 3,
				text: '3m'
			}, {
				type: 'month',
				count: 6,
				text: '6m'
			}, {
				type: 'year',
				count: 1,
				text: '1y'
			}, {
				type: 'all',
				text: 'All'
			}],
			selected: 1
		}

	};

	/**
	 * Preferences for ranges of acceptable data logger behavior
	 *   - Anything outside of MIN and MAX will not be green.
	 *   - Anything within WARN_SPAN units of MIN and MAX will be orange
	 *   - Anything outside of WARN_SPAN will be red.
	 */
	settings.WARNING_MAP = {
		dt: {
			MIN: -20,
			MAX: 52,
			WARN_SPAN: 12
		},
		da: {
			MIN: -0.15,
			MAX: 0.3,
			WARN_SPAN: 0.15
		},
		dv: {
			MIN: 11.2,
			MAX: 14.5,
			WARN_SPAN: 0.3
		},
		dlt: {
			MIN: -3 * 60,
			MAX: 15 * 60,
			WARN_SPAN: 3 * 60
		},
		lcq: {
			MIN: 90,
			MAX: 103,
			WARN_SPAN: 2
		}
	};

	
	// These classes are added to a data logger for the corresponding scenario.
	settings.STYLE = {
		DEFAULT: '',
		OK:      'positive green',
		WARN:    'warning purple',
		DANGER:  'negative red'
	}

	return settings;
})
