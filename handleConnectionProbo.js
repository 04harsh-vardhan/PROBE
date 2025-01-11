const token = { token: "1BcooLnFt1Lp2k5bXbcyziyhHsMe6kosMKwWV6HQYno=" };

function handleConnectionProbo(connection) {
  console.log("Probo client connected");

  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("Connection Closed");
  });
  connection.on("message", function (message) {
    const formatedString = formatString(message.utf8Data);
  
    if (message.type === "utf8") {
      const data = JSON.parse(formatedString);
    
      if (data?.upgrades) {
        connection.sendUTF(token);
        return;
      }
      if (data?.sid) {
        connection.sendUTF(["subscribe_orderbook", 3534269]);
        connection.sendUTF(["subscribe_ltp_stream", 3534269]);
        return;
      }
      if (Number(data) === 2) {
        connection.sendUTF(3);
      }
      console.log(data);
    }
  });
}

function formatString(s) {
  return s.slice(1);
}

module.exports = {
  handleConnectionProbo,
};
