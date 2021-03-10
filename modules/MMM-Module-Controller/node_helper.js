const bodyParser = require("body-parser");
const WebSocket = require("ws");

var NodeHelper = require("node_helper");
const Log = require("../../js/logger.js");

module.exports = NodeHelper.create({
	start: function () {
		this.config = null;
		this.pooler = [];

		var self = this;

		let ws = new WebSocket("ws://localhost:3683/frontend");

		ws.on("open", function open() {
			Log.log("Socket is Opened");
		});

		ws.on("message", function incoming(data) {
			msg = JSON.parse(data);
			Log.log(data);

			if (msg.method === undefined) {
				Log.log("CONTROLLER: socket message has no method");
			} else if (msg.data === undefined) {
				Log.log("CONTROLLER: socket message has no data");
			} else {
				let notificationName = "";
				let payload = msg.data;

				switch (msg.method) {
					case "update_modules_display":
						notificationName = "MODULE_CHANGE";
						break;

					case "display_exercise":
						notificationName = "DISPLAY_EXERCISE";
						break;

					case "display_text":
						notificationName = "DISPLAY_TEXT";
						break;

					case "start_displaying_heartrate":
						notificationName = "START_DISPLAY_HEARTRATE";
						break;

					case "change_heartrate":
						notificationName = "CHANGE_HEARTRATE";
						break;

					case "stop_alarm":
						notificationName = "STOP_ALARM";
						break;

					default:
						Log.log("Message method name given on controller socket was not correct");
				}
				if (notificationName !== "") {
					Log.log("CONTROLLER: ", notificationName, payload, msg.data);
					self.sendSocketNotification(notificationName, payload);
				}
			}
		});
	}
});
