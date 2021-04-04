/* Magic Mirror
 * Module: MMM-HTML-GIF-EXERCISE
 *
 * By Shlimshlam
 */

Module.register("MMM-HTML-GIF-EXERCISE", {
	defaults: {
		updateInterval: 10,
		gif: "quick_feet.gif"
	},

	notificationReceived: function (notification, payload) {
		if (notification === "CHANGE_GIF") {
			this.config.gif = payload;
		}
	},

	start: function () {
		let self = this;
		// send config to node helper
		this.sendSocketNotification("INIT", null);

		// Schedule update timer.
		this.scheduleUpdate(10);
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
		var wrapper = document.createElement("div");
		wrapper.className = self.config.classes ? self.config.classes : "thin xlarge bright pre-line";
		wrapper.id = "MMM-HTML-GIF-EXERCISE";
		wrapper.className = "MMM-HTML-GIF-EXERCISE module";
		wrapper.style.width = self.config.width;
		wrapper.style.height = self.config.height;
		wrapper.style.border = "none";
		wrapper.style.display = "block";
		wrapper.style.overflow = "hidden";
		wrapper.style.backgroundColor = self.config.backgroundColor;
		wrapper.scrolling = "no";

		let gifElement = document.createElement("img");
		gifElement.src = "modules/MMM-HTML-GIF-EXERCISE/" + this.config.gif;

		wrapper.appendChild(gifElement);

		return wrapper;
	},

	suspend: function () {
		var doms = document.getElementsByClassName("MMM-HTML-GIF-EXERCISE");
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "none";
			}
		}
	},

	resume: function () {
		var doms = document.getElementsByClassName("MMM-HTML-GIF-EXERCISE");
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "block";
			}
		}
	}
});
