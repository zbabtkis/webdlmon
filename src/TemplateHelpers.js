/**
 * Pass these on when rendering into template to format DL info strings
 */
define(['Settings', 'WarnCounter'], function(settings, WarnCounter) {
	return {

		getTemp: function(int) {
			return isNaN(this.dt) ? this.dt : Math.round(this.dt) + 'C';
		},

		getVolt: function() {
			return !isNaN(this.dv) ? parseFloat(this.dv).toFixed(1) + 'V' : this.dv;
		},

		getAmp: function() {
			return !isNaN(this.da)? Math.round(this.da * 1000) + 'mA' : this.da;
		},

		getCld: function() {
			return !isNaN(this.cld) ? Math.round(this.cld) + 'us' : this.cld;
		},

		seconds: function(num) {
			return !isNaN(num) ? Math.round(num) + 's' : num;
		},

		percent: function(num) {
			return !isNaN(num) ? Math.round(num) + '%' : num;
		},

		fixed: function(num, place) {
			return !isNaN(num) ? parseFloat(num).toFixed(place) : num;
		},

		round: function(num) {
			return !isNaN(num) ? Math.round(num) : num;
		},

		getElevation: function() {
			return !isNaN(this.elev) ? Math.round(this.elev * 1000) + 'm' : this.elev;
		},

		bigNumber: function(num) {
			var big;
			if(isNaN(num)) {
				big = num;
			} else if(parseInt(num) > 1000000) { 
				big = Math.round(num/1000000) + 'M'; 
			} else if(parseInt(num) >= 1000) {
				big = Math.round(num/1000) + 'K';
			} else {
				big = parseInt(num);
			}

			return big;
		},

		uptime: function(seconds) {
			var m = Math.floor(seconds / 60) % 60
			  , h = Math.floor(seconds / 3600) % 24
			  , d = Math.floor(seconds / 86400);

			var day = d ? d + "d": "";
			var hrs = h ? h + "h": "";
			var min = m ? m + "m": "";

			return (day + hrs + min) || seconds;
		},

		getColor: function(key) {
			var setting = settings.WARNING_MAP[key]
			  , style   = settings.STYLE
			  , val     = this[key]
			  , color;

			if(!setting || isNaN(val)) {
				return style.DEFAULT;
			}

			val = parseFloat(val);

			if(val <= setting.MAX && val >= setting.MIN) {
				if(val >= setting.MAX - setting.WARN_SPAN || val <= settings.MIN + setting.WARN_SPAN) {
					color = style.WARN;
				} else {
					color = style.OK;
				}
			} else {
				color = style.DANGER;
			}

			return color;
		}
	};
})