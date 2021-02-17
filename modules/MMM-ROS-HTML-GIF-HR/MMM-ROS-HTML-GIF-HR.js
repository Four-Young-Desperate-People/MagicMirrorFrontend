/* Magic Mirror
 * Module: MMM-ROS-HTML-GIF
 *
 * By Shlimslam
 */

Module.register("MMM-ROS-HTML-GIF-HR", {
	defaults: {
		hr: 1
	},

	start: function () {
		let self = this;
		// send config to node helper
		this.sendSocketNotification("INIT", null);

		// Schedule update timer.
		this.scheduleUpdate(300);
	},

	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		let self = this;

		if (notification === "DISPLAY HR") {
			this.config.hr = int(payload);
		}
	},

	scheduleUpdate: function (delay) {
		let self = this;
		let nextLoad = self.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		setTimeout(function () {
			self.updateDom();
			self.scheduleUpdate();
		}, nextLoad);
	},

	getDom: function () {
		let self = this;

		let gifName;
		if (self.config.hr <= 96) {
			gifName = "flower1.gif";
		} else if (self.config.hr <= 122) {
			gifName = "flower2.gif";
		} else if (self.config.hr <= 148) {
			gifName = "flower3.gif";
		} else if (self.config.hr <= 174) {
			gifName = "flower4.gif";
		} else {
			gifName = "flower5.gif";
		}

		var wrapper = document.createElement("div");
		wrapper.className = self.config.classes ? self.config.classes : "thin xlarge bright pre-line";
		wrapper.id = "MMM-ROS-HTML-GIF-HR";
		wrapper.className = "MMM-ROS-HTML-GIF-HR module";
		wrapper.style.width = self.config.width;
		wrapper.style.height = self.config.height;
		wrapper.style.border = "none";
		wrapper.style.display = "block";
		wrapper.style.overflow = "hidden";
		wrapper.style.backgroundColor = self.config.backgroundColor;
		wrapper.scrolling = "no";

		let gifElement = document.createElement("img");
		gifElement.src = "modules/MMM-ROS-HTML-GIF/" + gifName;

		let hrElement = document.createElement("h3");
		hrElement.innerText = document.createTextNode(String(self.config.hr));

		wrapper.appendChild(gifElement);
		wrapper.appendChild(hrElement);

		return wrapper;
	},

	suspend: function () {
		var doms = document.getElementsByClassName("MMM-ROS-HTML-GIF-HR");
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "none";
			}
		}
	},

	resume: function () {
		var doms = document.getElementsByClassName("MMM-ROS-HTML-GIF-HR");
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "block";
			}
		}
	}
});
