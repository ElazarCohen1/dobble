import {io} from "socket.io-client";

const BACK_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const socket = io(BACK_URL);

export default socket;