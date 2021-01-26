const bodyParser = require("body-parser");

var NodeHelper = require("node_helper");
const Log = require("../../js/logger.js");
const ROSLIB = require("roslib");
var listener;

module.exports = NodeHelper.create({
	start: function () {
		this.config = null;
		this.pooler = [];

		var ros = new ROSLIB.Ros({
			url: "ws://localhost:9090"
		});

		ros.on("connection", function () {
			Log.log("Connected to websocket server.");
		});

		ros.on("error", function (error) {
			Log.error("Error connecting to websocket server: ", error);
		});

		ros.on("close", function () {
			Log.log("Connection to websocket server closed.");
		});

		listener = new ROSLIB.Topic({
			ros: ros,
			name: "/update_hr_display",
			messageType: "std_msgs/String"
		});

		listener.subscribe(this.rosCallback.bind(this));
	},

	rosCallback: function (message) {
		Log.log("Received message on " + listener.name + ": " + message.data);
		this.sendSocketNotification("GIF_CHANGE", message.data);
	}
});
