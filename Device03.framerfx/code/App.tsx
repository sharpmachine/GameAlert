import { Override, Data } from "framer"
import { connectToHost } from "./Client"

// Socket
// const serverUrl = "http://localhost:8080"
const serverUrl = "https://7qjei.sse.codesandbox.io/"

// listening
const responses = {
    CONNECT: () => console.log(`Device ${deviceID} Connected`),
    DISCONNECT: () => console.log(`Device ${deviceID} Disconnected`),
    BUTTON_CHANGE: data => {
        if (data.deviceID == 0) {
            appState.isDevice_0_Online = data.isOnline
        } else if (data.deviceID == 1) {
            appState.isDevice_1_Online = data.isOnline
        } else if (data.deviceID == 2) {
            appState.isDevice_2_Online = data.isOnline
        } else if (data.deviceID == 3) {
            appState.isDevice_3_Online = data.isOnline
        }
    },
}

// DEVICE ID | USER | COLOR
//––––––––––––––––––––––––––
// 0         | Jake  | Red
// 1         | Jesse | Green
// 2         | Jonah | Blue
// 3         | Nick  | Yellow

const dispatch = connectToHost(serverUrl, responses)
const deviceID = 3 // Nick

const appState = Data({
    isDevice_0_Online: false,
    isDevice_1_Online: false,
    isDevice_2_Online: false,
    isDevice_3_Online: false,
})

export function Switch(): Override {
    return {
        value: appState[Object.keys(appState)[deviceID]],
        onValueChange: value => {
            dispatch("FLIP_SWITCH", { isOnline: value, deviceID: deviceID })
        },
    }
}

export function device_0_indicator(): Override {
    return {
        opacity: appState.isDevice_0_Online ? 1 : 0.3,
    }
}

export function device_1_indicator(): Override {
    return {
        opacity: appState.isDevice_1_Online ? 1 : 0.3,
    }
}

export function device_2_indicator(): Override {
    return {
        opacity: appState.isDevice_2_Online ? 1 : 0.3,
    }
}
export function device_3_indicator(): Override {
    return {
        opacity: appState.isDevice_3_Online ? 1 : 0.3,
    }
}
