var ip = require("ip")
var http = require("http")
var app = require("express")()

var port = 8080
var server = http.createServer(app)
var io = require("socket.io")(server)

// 1. Socket Map

const subscribers = new Map()

const subscribe = (id, socket) => {
	if (subscribers.has(id)) {
		unsubscribe(id)
	}

	subscribers.set(id, socket)
	console.log(`Connected to client at ${id}`)
}

const unsubscribe = id => {
	subscribers.delete(id)
	console.log(`Disconnected from client at ${id}`)
}

const notifySubscribers = data => {
	subscribers.forEach(socket => socket.emit("action", data))
}

// 2. Socket Host

io.on("connection", socket => {
	const id = socket.handshake.headers.origin

	subscribe(id, socket)

	socket.on("action", data => {
		notifySubscribers(data)
	})

	socket.on("disconnect", () => {
		unsubscribe(id)
	})
})

// 3. Start the server
server.listen(port, () =>
	console.log(`
👋
Server started
Socket host is listening at ${ip.address()}:${port}
`)
)
