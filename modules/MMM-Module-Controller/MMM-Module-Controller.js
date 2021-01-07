/* Magic Mirror
* Module: MMM-Module-Controller
*
* By Shlimslam
*/

Module.register("MMM-Module-Controller",{ 
	start: function() {
		// send config to node helper
		this.sendSocketNotification("INIT", null)
	},


	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MODULE_CHANGE") {
            this.sendNotification('CHANGE_POSITIONS', 
                modules = JSON.parse(payload)
            );
		}
	},
}
)
