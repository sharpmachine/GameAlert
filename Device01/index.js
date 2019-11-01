var { connectToHost } = require("./client");
var five = require("johnny-five");
var board = new five.Board();

function main() {
	// Connection

	// const serverUrl = "http://localhost:8080";
	const serverUrl = "https://7qjei.sse.codesandbox.io/";

	// listening
	const responses = {
		CONNECT: () => console.log("Connected yo!"),
		DISCONNECT: () => console.log("Disconnected"),
		FLIP_SWITCH: data => toggleLED(data.isOnline, data.deviceID)
	};

// DEVICE ID | USER | COLOR
//––––––––––––––––––––––––––
// 0         | Jake  | Red
// 1         | Jesse | Green
// 2         | Jonah | Blue
// 3         | Nick  | Yellow

	const dispatch = connectToHost(serverUrl, responses);
	const deviceID = 1;

	// Components
	const button = new five.Button(2);
	const device_0_led = new five.Led(4);
	const device_1_led = new five.Led(3);
	const device_2_led = new five.Led(5);
	const device_3_led = new five.Led(6);

	board.repl.inject({
		button: button,
		device_0_led: device_0_led,
		device_1_led: device_1_led,
		device_2_led: device_2_led,
		device_3_led: device_3_led
	});

	// State changes
	function toggleLED(isOnline, deviceID) {
		dispatch("BUTTON_CHANGE", { isOnline: isOnline, deviceID: deviceID });
		if (isOnline) {
			if (deviceID == 0) {
				device_0_led.on()
			} else if (deviceID == 1) {
				device_1_led.on()
			} else if (deviceID == 2) {
				device_2_led.on()
			} else if (deviceID == 3) {
				device_3_led.on()
			}
		} else {
			if (deviceID == 0) {
				device_0_led.off()
			} else if (deviceID == 1) {
				device_1_led.off()
			} else if (deviceID == 2) {
				device_2_led.off()
			} else if (deviceID == 3) {
				device_3_led.off()
			}
		}
	};

	// Events
	let isOnline = false

	button.on("down", function() {
		isOnline = !isOnline
		isOnline ? device_1_led.on() : device_1_led.off()
		dispatch("BUTTON_CHANGE", { isOnline: isOnline, deviceID: deviceID });
	});
}

// When the board is ready, run main
board.on("ready", main);
