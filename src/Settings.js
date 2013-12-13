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
	settings.RRD_ERROR   = "No data could be fetched from the RRD";
	settings.ENOFILE     = "file not available";

	
	settings.RRD_OK_MSG  = "<i class='large thumbs up icon'></i>"
						 + "And we're back!"; 
	settings.RRD_ERR_MSG = "<i class='large attention icon'></i>"
						 + "This data is old because dlmon2json has stopped!"; 


	settings.GRAPH_START = new Date().getTime() - 84000 * 7;
	settings.GRAPH_END   = new Date().getTime();

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
