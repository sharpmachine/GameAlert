var io = require("socket.io-client")

let socket

/**
 * ## connectToHost
 * - `serverUrl` The URL where the socket host is running.
 * - `responses` (optional) An object with callbacks for different actions emitted from the host.
 * 
 * ```
connectToHost(
    "http://localhost:3000", 
    {
        FLIP_SWITCH: (isOn: boolean) => {
            appState.isOn = isOn
        }
    })
```
 * 
 */
function connectToHost(serverUrl, responses = {}) {
	// Create a socket connection to the host
	// at the provided server URL.
	socket = io(serverUrl)

	const id = socket.id

	/**
     * ## Dispatch  
     * Send an action to the host.
     * - `type` The action's type.
     * - `data` (optional) An object to send with the action.
     * 
     * ```
dispatch("FLIP_SWITCH", { isOn: true })
```
     * 
     */
	function dispatch(type, data = {}) {
		socket.emit("action", {
			type,
			...data,
		})
	}

	// When the socket connects, trigger the
	// "CONNECT" response with the socket's ID.
	socket.on(
		"connect",
		() => responses["CONNECT"] && responses["CONNECT"]({ id })
	)

	// When the socket disconnects, trigger the
	// "DISCONNECT" response with the socket's ID.
	socket.on(
		"disconnect",
		() => responses["DISCONNECT"] && responses["DISCONNECT"]({ id })
	)

	// When the socket receives an action from the
	// host, run the corresponding response (if one
	// exists for the action's type)
	socket.on(
		"action",
		({ type, ...data }) => responses[type] && responses[type](data)
	)

	return dispatch
}

module.exports = { connectToHost }
