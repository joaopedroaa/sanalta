import { reactive } from "vue";
import { io } from "socket.io-client";

export const state2 = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

export const socket = io(URL);

socket.on("connect", () => {
  state2.connected = true;
  console.log(state2);

});

socket.on("disconnect", () => {
  state2.connected = false;
    console.log(state2);
});

socket.on("foo", (...args) => {
  state2.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state2.barEvents.push(args);
});
