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
		FLIP_SWITCH: data => toggleLED(data.isOn)
	};

	const dispatch = connectToHost(serverUrl, responses);

	// Components
	const button = new five.Button(2);
	const friendLed = new five.Led(4);
	const myLed = new five.Led(3);

	board.repl.inject({
		button: button,
		blueLed: friendLed,
		myLed: myLed
	});

	// State changes
	const toggleLED = isOn => {
		if (isOn) {
			friendLed.on();
		} else {
			friendLed.off();
		}
	};

	// Events
	let isOnline = false

	button.on("down", function() {
		isOnline = !isOnline
		isOnline ? myLed.on() : myLed.off()
		// friend's device
		dispatch("BUTTON_CHANGE", { isOnline: isOnline });
	});
}

// When the board is ready, run main
board.on("ready", main);
