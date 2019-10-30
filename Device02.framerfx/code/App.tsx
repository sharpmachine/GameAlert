import { Override, Data } from "framer"
import { connectToHost } from "./Client"

// Socket
// const serverUrl = "http://localhost:8080"
const serverUrl = "https://7qjei.sse.codesandbox.io/";

// listening
const responses = {
    CONNECT: () => console.log("Connected beeotch"),
    DISCONNECT: () => console.log("Disconnected"),
    BUTTON_CHANGE: data => (appState.jesseIsOnline = data.isOnline),
}

const dispatch = connectToHost(serverUrl, responses)

// Overrides

const appState = Data({
    switchIsOn: false,
    jesseIsOnline: false,
})

export function Switch(): Override {
    return {
        value: appState.switchIsOn,
        onValueChange: value => {
            dispatch("FLIP_SWITCH", { isOn: value })
        },
    }
}

export function ButtonIndicator(): Override {
    return {
        opacity: appState.jesseIsOnline ? 1 : 0.3,
    }
}
