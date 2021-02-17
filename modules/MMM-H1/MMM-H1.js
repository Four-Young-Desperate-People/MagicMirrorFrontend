/* Magic Mirror
 * Module: MMM-H1
 *
 * By Shlimslam
 */

Module.register("MMM-H1", {
	defaults: {
		text: ""
	},

	start: function () {
		let self = this;
		// send config to node helper
		this.sendSocketNotification("INIT", null);

		// Schedule update timer.
		this.scheduleUpdate(300);
	},

	notificationReceived: function (notification, payload) {
		if (notification === "CHANGE_TEXT") {
			this.config.text = payload;
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
		var wrapper = document.createElement("div");
		wrapper.className = self.config.classes ? self.config.classes : "thin xlarge bright pre-line";
		wrapper.id = "MMM-H1";
		wrapper.className = "MMM-H1 module";
		wrapper.style.width = self.config.width;
		wrapper.style.height = self.config.height;
		wrapper.style.border = "none";
		wrapper.style.display = "block";
		wrapper.style.overflow = "hidden";
		wrapper.style.backgroundColor = self.config.backgroundColor;
		wrapper.scrolling = "no";

		let textElement = document.createElement("h1");
		textElement.innerText = document.createTextNode(String(self.config.text));

		wrapper.appendChild(textElement);

		return wrapper;
	},

	suspend: function () {
		var doms = document.getElementsByClassName("MMM-H1");
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "none";
			}
		}
	},

	resume: function () {
		var doms = document.getElementsByClassName("MMM-H1");
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "block";
			}
		}
	}
});
