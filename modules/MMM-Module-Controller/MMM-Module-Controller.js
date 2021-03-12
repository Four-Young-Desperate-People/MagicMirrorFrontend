/* Magic Mirror
 * Module: MMM-Module-Controller
 *
 * By Shlimslam
 */

Module.register("MMM-Module-Controller", {
	foo: null,

	defaults: {
		updateInterval: 10,
		alarmMode: false,
		currentWeatherLoaded: false,
		weatherForecastLoaded: false,
		bothLoadedAndAccounted: false,
		mostRecentCommand: null,
		regular_mode_modules: {
			compliments: {
				visible: "false",
				position: "top_center"
			},
			clock: {
				visible: "false",
				position: "top_right"
			},
			currentweather: {
				visible: "false",
				position: "bottom_left"
			},
			weatherforecast: {
				visible: "false",
				position: "bottom_right"
			},
			newsfeed: {
				visible: "false",
				position: "middle_center"
			},
			"MMM-H1": {
				visible: "false",
				position: "middle_center"
			},
			"MMM-HTML-GIF-EXERCISE": {
				visible: "false",
				position: "middle_center"
			},
			"MMM-HTML-GIF-HR": {
				visible: "false",
				position: "top_right"
			}
		},

		alarm_mode_modules: {
			compliments: {
				visible: "false",
				position: "top_center"
			},
			clock: {
				visible: "false",
				position: "top_right"
			},
			currentweather: {
				visible: "false",
				position: "bottom_left"
			},
			weatherforecast: {
				visible: "false",
				position: "bottom_right"
			},
			newsfeed: {
				visible: "false",
				position: "middle_center"
			},
			"MMM-H1": {
				visible: "false",
				position: "middle_center"
			},
			"MMM-HTML-GIF-EXERCISE": {
				visible: "false",
				position: "middle_center"
			},
			"MMM-HTML-GIF-HR": {
				visible: "false",
				position: "top_right"
			}
		}
	},

	start: function () {
		// send config to node helper
		this.sendSocketNotification("INIT", null);
	},

	notificationReceived: function (notification, payload) {
		if (!this.config.weatherForecastLoaded) {
			if (notification === "WEATHER_FORECAST_LOADED") {
				this.config.weatherForecastLoaded = true;
				if (this.foo != null) {
					this.sendNotification("CHANGE_POSITIONS", (modules = this.foo));
				} else {
					this.sendNotification("CHANGE_POSITIONS", (modules = this.config.regular_mode_modules));
				}
			}
		}
	},

	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MODULE_CHANGE" && this.config.alarmMode === false) {
			this.config.regular_mode_modules = payload;
			if (this.config.weatherForecastLoaded) {
				this.sendNotification("CHANGE_POSITIONS", (modules = this.config.regular_mode_modules));
			} else {
				this.foo = payload;
			}
		} else if (notification === "DISPLAY_EXERCISE") {
			this.config.alarmMode = true;
			this.config.alarm_mode_modules["MMM-HTML-GIF-EXERCISE"]["visible"] = "true";
			this.config.alarm_mode_modules["MMM-H1"]["visible"] = "false";
			this.config.alarm_mode_modules["MMM-HTML-GIF-HR"]["visible"] = "false";

			if (this.config.weatherForecastLoaded) {
				this.sendNotification("CHANGE_POSITIONS", (modules = this.config.alarm_mode_modules));
			} else {
				this.config.mostRecentCommand = payload;
			}

			this.sendNotification("CHANGE_GIF", payload);
		} else if (notification === "DISPLAY_TEXT") {
			this.config.alarm_mode_modules["MMM-HTML-GIF-EXERCISE"]["visible"] = "false";
			this.config.alarm_mode_modules["MMM-H1"]["visible"] = "true";
			this.config.alarm_mode_modules["MMM-HTML-GIF-HR"]["visible"] = "false";

			if (this.config.weatherForecastLoaded) {
				this.sendNotification("CHANGE_POSITIONS", (modules = this.config.alarm_mode_modules));
			} else {
				this.config.mostRecentCommand = payload;
			}

			this.sendNotification("CHANGE_TEXT", payload);
		} else if (notification === "START_DISPLAY_HEARTRATE") {
			this.config.alarm_mode_modules["MMM-HTML-GIF-EXERCISE"]["visible"] = "false";
			this.config.alarm_mode_modules["MMM-H1"]["visible"] = "true";
			this.config.alarm_mode_modules["MMM-HTML-GIF-HR"]["visible"] = "true";

			if (this.config.weatherForecastLoaded) {
				this.sendNotification("CHANGE_POSITIONS", (modules = this.config.alarm_mode_modules));
			} else {
				this.config.mostRecentCommand = payload;
			}

			this.sendNotification("CHANGE_HR", payload);
			this.sendNotification("CHANGE_TEXT", "Stand still to take HR");
		} else if (notification === "CHANGE_HEARTRATE") {
			this.sendNotification("CHANGE_HR", payload);
			this.sendNotification("CHANGE_TEXT", "HR is being measured");
		} else if (notification === "HEARTRATE_NOT_HIGH_ENOUGH") {
			this.config.alarm_mode_modules["MMM-HTML-GIF-EXERCISE"]["visible"] = "false";
			this.config.alarm_mode_modules["MMM-H1"]["visible"] = "true";
			this.config.alarm_mode_modules["MMM-HTML-GIF-HR"]["visible"] = "false";

			if (this.config.weatherForecastLoaded) {
				this.sendNotification("CHANGE_POSITIONS", (modules = this.config.alarm_mode_modules));
			} else {
				this.config.mostRecentCommand = payload;
			}

			this.sendNotification("CHANGE_TEXT", "HR was not high enough");
		} else if (notification === "STOP_ALARM") {
			this.config.alarmMode = false;

			if (this.config.weatherForecastLoaded) {
				this.sendNotification("CHANGE_POSITIONS", (modules = this.config.regular_mode_modules));
			} else {
				this.config.mostRecentCommand = payload;
			}

			this.config.alarm_mode_modules["MMM-HTML-GIF-EXERCISE"]["visible"] = "false";
			this.config.alarm_mode_modules["MMM-H1"]["visible"] = "false";
			this.config.alarm_mode_modules["MMM-HTML-GIF-HR"]["visible"] = "false";
		}
	}
});
