#!/usr/bin/env node
let WebSocketClient = require("websocket").client;
let handleConnection = require("./handleConnection").handleConnection;
let handleConnectionProbo = require("./handleConnectionProbo").handleConnectionProbo 

let binanceClient = new WebSocketClient();
let proboClient = new WebSocketClient();

// binanceClient.on("connectFailed", function (error) {
//   console.log("Connect Error: " + error.toString());
// });

//binanceClient.on("connect", handleConnection);
proboClient.on("connect",handleConnectionProbo)
//binanceClient.connect("wss://stream.binance.com/stream");
proboClient.connect("wss://falcon.api.probo.in/socket.io/?EIO=4&transport=websocket")
