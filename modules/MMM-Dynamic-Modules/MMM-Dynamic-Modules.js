Module.register("MMM-Dynamic-Modules", {
	defaults: {
		clear_screen: {
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

	notificationReceived: function (notification, payload) {
		let foo = 7;
		if (notification === "CHANGE_POSITIONS") {
			this.setPositions(this.config.clear_screen);
			this.setPositions(payload);
		}

		if (notification === "CHANGE_POSITIONS_DEFAULTS") {
			this.setDefaults();
		}
	},

	getid: function (mname) {
		var id;
		MM.getModules().enumerate(function (module) {
			if (mname == module.name) {
				id = module.identifier;
			}
		});
		return id;
	},

	setPositions: function (object) {
		//get data with:
		var modulenames = Object.keys(object);
		var values = Object.values(object);

		for (var i = 0; i < modulenames.length; i++) {
			var id = this.getid(modulenames[i]);
			MM.getModules()
				.withClass(modulenames[i])
				.enumerate(function (module) {
					if (values[i].position) {
						var split_position = values[i].position.split("_");
						var selected_module = document.getElementById(id);
						var region = document.querySelector("div.region." + split_position[0] + "." + split_position[1] + " div.container");

						// Make sure the region is visible
						if (region.style.display === "none") {
							region.style.display = "block";
						}

						// Move module
						region.appendChild(selected_module);
					}

					// Set the module visible after moving to trigger css opacity transition animation
					if (values[i].visible == "true") {
						module.show(1000, function () {});
					} else if (values[i].visible == "false") {
						module.hide(1000, function () {});
					}
				});
		}
	},

	setDefaults: function () {
		MM.getModules().enumerate(function (module) {
			if (module.data.position) {
				var split_position = module.data.position.split("_");
				var selected_module = document.getElementById(module.identifier);
				var region = document.querySelector("div.region." + split_position[0] + "." + split_position[1] + " div.container");

				// Make sure the region is visible
				if (region.style.display === "none") {
					region.style.display = "block";
				}

				// Move module to its original position
				region.appendChild(selected_module);

				// Show module
				module.show(1000, function () {});
			}
		});
	}
});
