let extractPrice = require("./extractPrice").extractPrice;

function handleConnection(connection) {
  console.log("WebSocket Client Connected");
  connection.sendUTF(
    '{"method":"SUBSCRIBE","params":["!miniTicker@arr@3000ms","!ticker_1h@arr@3000ms","!ticker_4h@arr@3000ms"],"id":1}'
  );
  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("Connection Closed");
  });
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      const data = JSON.parse(message.utf8Data).data;
      // we have to check for data because on first packet there is no data
      if (data) extractPrice(data);
    }
  });
}

module.exports = {
  handleConnection,
};
