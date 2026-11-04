// import { io } from "socket.io-client";
import Config from 'react-native-config';

export const BaseUrl = Config.BASEURL;

// export const socket = io(BaseUrl, {
//   autoConnect: false,
//   timeout: 10000,
// Reconnection
//   reconnection: true,
//   reconnectionAttempts: 10,
//   reconnectionDelay: 2000,
//   reconnectionDelayMax: 10000,

// Always try WebSocket first, fall back to polling
// If the websocket does not connects then comment the bellow line
//   transports: ['websocket', 'polling'],
// });
