/* Magic Mirror
* Module: MMM-ROS-HTML-GIF
*
* By Shlimslam
*/

Module.register("MMM-ROS-HTML-GIF",{ 
	
	defaults: {
		gifUrl: "",
	},

	start: function() {
		let self = this;
		// send config to node helper
		this.sendSocketNotification("INIT", null)

		// Schedule update timer.
		this.scheduleUpdate(2000);
	},


	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		let self = this;

		if (notification === "GIF_CHANGE") {
            // this.sendNotification('CHANGE_POSITIONS', 
            //     modules = {
            //         'clock':{
            //             visible: 'true',
            //             position: 'top_left',
            //         },
            //     }
            // );
			this.config.gifUrl = payload;
		}
	},

	scheduleUpdate: function(delay) {
		let self = this
		let nextLoad = self.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		setTimeout(function() {
			self.updateDom();
			self.scheduleUpdate();
		}, nextLoad);
	},


	getDom: function() {
		let self = this
		var wrapper = document.createElement("div")
		wrapper.className = self.config.classes ? self.config.classes : "thin xlarge bright pre-line";
		wrapper.id = "MMM-ROS-HTML-GIF"
		wrapper.className = "MMM-ROS-HTML-GIF module"
		wrapper.style.width = self.config.width
		wrapper.style.height = self.config.height
		wrapper.style.border = "none"
		wrapper.style.display = "block"
		wrapper.style.overflow = "hidden"
		wrapper.style.backgroundColor = self.config.backgroundColor
		wrapper.scrolling = "no"

		let goo = document.createElement("img")
		goo.src = self.config.gifUrl;

		wrapper.appendChild(goo)

		return wrapper
	},

	suspend: function() {
		var doms = document.getElementsByClassName("MMM-ROS-HTML-GIF")
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "none"
			}
		}
	},

	resume: function() {
		var doms = document.getElementsByClassName("MMM-ROS-HTML-GIF")
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "block"
			}
		}
	},

}
)