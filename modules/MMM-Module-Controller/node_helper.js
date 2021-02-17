const bodyParser = require("body-parser");
const WebSocket = require("ws");

var NodeHelper = require("node_helper");
const Log = require("../../js/logger.js");
// const ROSLIB = require("roslib")
// var listener_update_modules;
// var listener_display_exercise;
// var listener_display_text;
// var listener_start_display_hr;
// var listener_stop_alarm;

module.exports = NodeHelper.create({
	start: function () {
		this.config = null;
		this.pooler = [];

		let self = this;

		let ws = new WebSocket("ws://localhost:8765");

		ws.on("open", function open() {
			Log.log("Socket is Opened");
		});

		ws.on("message", function incoming(data) {
			msg = JSON.parse(data);
			Log.log(msg);
			self.sendSocketNotification("DISPLAY_EXERCISE", msg.data.gif);
		});

		// var ros = new ROSLIB.Ros({
		// 	url : 'ws://localhost:9090'
		// });

		// ros.on('connection', function() {
		// 	Log.log('Connected to websocket server.');
		// });

		// ros.on('error', function(error) {
		// 	Log.error('Error connecting to websocket server: ', error);
		// });

		// ros.on('close', function() {
		// 	Log.log('Connection to websocket server closed.');
		// });

		// // listener for update modules
		// listener_update_modules = new ROSLIB.Topic({
		// 	ros : ros,
		// 	name : '/update_modules_display',
		// 	messageType : 'std_msgs/String'
		// });

		// listener_update_modules.subscribe(this.ros_callback_update_modules.bind(this));

		// listener for display exercise
		// listener_display_exercise = new ROSLIB.Topic({
		// 	ros : ros,
		// 	name : '/display_exercise',
		// 	messageType : 'std_msgs/String',
		// 	queue_size: 500
		// });

		// listener_display_exercise.subscribe(this.ros_callback_display_exercise.bind(this));

		// // listener for submit to heartrate
		// listener_display_text = new ROSLIB.Topic({
		// 	ros : ros,
		// 	name : '/display_text',
		// 	messageType : 'std_msgs/String'
		// });

		// listener_display_text.subscribe(this.ros_callback_display_text.bind(this));

		// // listener for start display heartrate
		// listener_start_display_hr = new ROSLIB.Topic({
		// 	ros : ros,
		// 	name : '/start_displaying_heartrate',
		// 	messageType : 'std_msgs/Bool'
		// });

		// listener_start_display_hr.subscribe(this.ros_callback_start_display_hr.bind(this));

		// // listener for stop alarm
		// listener_stop_alarm = new ROSLIB.Topic({
		// 	ros : ros,
		// 	name : '/stop_alarm',
		// 	messageType : 'std_msgs/Bool'
		// });

		// listener_stop_alarm.subscribe(this.ros_callback_stop_alarm.bind(this));
	}

	// ros_callback_update_modules: function(message) {
	// 	this.sendSocketNotification("MODULE_CHANGE", message.data);
	// 	Log.log('Received message on ' + listener_update_modules.name + ': ' + message.data);
	// },

	// ros_callback_display_exercise: function(message) {
	// 	this.sendSocketNotification("DISPLAY_EXERCISE", message.data);
	// 	Log.log('(CONTROLLER): Received message on ' + listener_display_exercise.name + ': ' + message.data);
	// },

	// ros_callback_display_text: function(message) {
	// 	this.sendSocketNotification("DISPLAY_TEXT", message.data);
	// 	Log.log('Received message on ' + listener_display_text.name + ': ' + message.data);
	// },

	// ros_callback_start_display_hr: function(message) {
	// 	this.sendSocketNotification("START_DISPLAY_HEARTRATE", message.data);
	// 	Log.log('Received message on ' + listener_start_display_hr.name + ': ' + message.data);
	// },

	// ros_callback_stop_alarm: function(message) {
	// 	this.sendSocketNotification("STOP_ALARM", message.data);
	// 	Log.log('Received message on ' + listener_stop_alarm.name + ': ' + message.data);
	// }
});
