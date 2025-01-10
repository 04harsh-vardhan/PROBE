#!/usr/bin/env node
let WebSocketClient = require("websocket").client;
let handleConnection = require("./handleConnection").handleConnection;

let client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", handleConnection);

client.connect("wss://stream.binance.com/stream");
