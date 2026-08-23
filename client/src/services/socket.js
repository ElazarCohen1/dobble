import {io} from "socket.io-client";

const BACK_URL = import.meta.env.API_URL ;


const socket = io(BACK_URL);

export default socket;